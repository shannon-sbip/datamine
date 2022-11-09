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
  req,
  res
}: HandleMagicLinkArgs) => {
  const { userId, eventId } = await getUnsealedData(userSeal);
  const currentUser = await getUserEventFromDbByUserId(prisma, userId);
  if (!currentUser || !currentUser.isActive || currentUser.id !== eventId) {
    res.status(400).json({ message: "Seal is invalid. Please generate a new link." });
    return;
  }
  req.session.userEvent = {
    id: currentUser.id,
    userId: currentUser.userId
  };
  req.session.save();
  res.status(200).json({ message: `Login session has been created for ${currentUser.email}` });
};
export default handleMagicLink;
