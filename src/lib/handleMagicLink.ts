import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import getUnsealedData from "./getUnsealedData";
import getUserEventFromDbByEmail from "./getUserEventFromDbByEmail";
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
  const { email, eventId } = await getUnsealedData(userSeal);
  const currentUser = await getUserEventFromDbByEmail(prisma, email);
  if (!currentUser || !currentUser.isActive || currentUser.id !== eventId) {
    res.status(400).json({ message: "Seal is invalid. Please generate a new link." });
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
  res.status(200).json({ message: `Login successful for ${currentUser.email}` });
};
export default handleMagicLink;
