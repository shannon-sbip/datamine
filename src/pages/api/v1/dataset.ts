import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import getS3Url from "../../../lib/getS3Url";
import getUnsealedData from "../../../lib/getUnsealedData";
import getUserEventFromDbByUserId from "../../../lib/getUserEventFromDbByUserId";
import postDownloadEvent from "../../../lib/postDownloadEvent";
type Data = {
  message: string
  data?: {
    url: string
  }
}
const prisma = new PrismaClient();
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { seal } = req.body || {};
  const userSeal = seal ? String(seal) : "";
  if (req.method !== "POST" || !userSeal) {
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
    await postDownloadEvent(prisma, currentUser.userId);
    res.status(201).json({
      message: "Success.",
      data: {
        url: getS3Url()
      }
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
export default handler;
