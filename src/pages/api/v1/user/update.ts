import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import getUnsealedData from "../../../../lib/getUnsealedData";
import getUserEventFromDbByEmail from "../../../../lib/getUserEventFromDbByEmail";
import postUserEvent from "../../../../lib/postUserEvent";
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
  const { seal, users } = req.body || {};
  const userSeal = seal ? String(seal) : "";
  if (req.method !== "POST" || !userSeal) {
    res.status(400).json({ message: "Invalid user request." });
    return;
  }
  try {
    const { email, eventId } = await getUnsealedData(userSeal);
    const currentUser = await getUserEventFromDbByEmail(prisma, email);
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
    const postUserEventSuccess = await postUserEvent(prisma, users);
    if (postUserEventSuccess) {
      res.status(201).json({ message: "Successfully updated the users." });
    } else {
      res.status(403).json({ message: "Validation failed." });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
export default handler;
