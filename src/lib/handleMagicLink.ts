import { PrismaClient } from "@prisma/client";
import { unsealData } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
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
  const { userId, eventId } = (
        await unsealData(userSeal, { password: process.env.SEAL_PASSWORD || "" }) || {}
      ) as { userId: string, eventId: string};
  const currentUser = await prisma.userEvent.findFirst({
    where: {
      userId: {
        equals: userId
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
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
