import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import getDownloadsFromDbByUserId from "../../../../lib/getDownloadsFromDbByUserId";
import getUnsealedData from "../../../../lib/getUnsealedData";
import getUserEventFromDbByUserId from "../../../../lib/getUserEventFromDbByUserId";
import { User } from "../../../../types/user";
type Data = {
  message: string
  data?: User
}
const prisma = new PrismaClient();
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { seal } = req.body || {};
  const userSeal = seal ? String(seal) : "";
  if (req.method !== "GET" || !userSeal) {
    res.status(400).json({ message: "Invalid user request." });
    return;
  }
  try {
    const { userId, eventId } = await getUnsealedData(userSeal);
    const currentUser = await getUserEventFromDbByUserId(prisma, userId);
    if (!currentUser || currentUser.id !== eventId) {
      res.status(404).json({ message: "Seal is invalid. Please generate a new magic link." });
      return;
    }
    const range = [
      currentUser.validFrom.getTime(),
      currentUser.validTo.getTime()
    ];
    const now = (new Date()).getTime();
    if (now < range[0] || now > range[1]) {
      res.status(403).json({ message: "User is currently not able to access the data." });
      return;
    }
    const downloads = await getDownloadsFromDbByUserId(prisma, currentUser.userId);
    res.status(200).json({
      message: "Success.",
      data: {
        id: currentUser.userId,
        email: currentUser.email,
        name: currentUser.name,
        affilation: currentUser.affilation,
        downloadCount: downloads.length,
        maxDownloadCount: currentUser.maxDownloadCount,
        validFrom: range[0],
        validTo: range[1]
      }
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
export default handler;
