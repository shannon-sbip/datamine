import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import getUnsealedData from "./getUnsealedData";
import getUserEventFromDbByUserId from "./getUserEventFromDbByUserId";
type HandleMagicLinkArgs = {
    prisma: PrismaClient,
    userSeal: string,
    req: NextApiRequest,
    res: NextApiResponse
}
const handleMagicLink = async ({
  prisma,
  userSeal,
  // eslint-disable-next-line no-unused-vars
  req,
  res
}: HandleMagicLinkArgs) => {
  const { userId, eventId } = await getUnsealedData(userSeal);
  const currentUser = await getUserEventFromDbByUserId(prisma, userId);
  if (!currentUser || !currentUser.isActive || currentUser.id !== eventId) {
    res.status(400).json({ message: "Seal is invalid. Please generate a new link." });
    return;
  }
  res.status(200).json({ message: `Login successful for ${currentUser.email}` });
};
export default handleMagicLink;
