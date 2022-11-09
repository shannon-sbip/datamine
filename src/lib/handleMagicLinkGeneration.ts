import { PrismaClient } from "@prisma/client";
import { sealData } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import getUserEventFromDbByEmail from "./getUserEventFromDbByEmail";
import postEmail from "./postEmail";
type HandleMagicLinkGenerationArgs = {
    prisma: PrismaClient,
    req: NextApiRequest,
    res: NextApiResponse
}
const handleMagicLinkGeneration = async ({
  prisma,
  req,
  res
}: HandleMagicLinkGenerationArgs) => {
  const { email } = req.body || {};
  if (!email) {
    res.status(400).json({ message: "Invalid login request." });
    return;
  }
  const currentUser = await getUserEventFromDbByEmail(prisma, email);
  if (!currentUser || !currentUser.isActive) {
    res.status(404).json({ message: "No such user." });
    return;
  }
  const newSeal = await sealData({
    userId: currentUser.userId,
    eventId: currentUser.id
  }, {
    password: process.env.SEAL_PASSWORD || ""
  });
  postEmail(
    {
      email: currentUser.email,
      subject: "Magic Link",
      // eslint-disable-next-line max-len
      Body: `Hey there ${currentUser.name}, <a href="${process.env.NEXT_PUBLIC_APP_URL}/user?seal=${newSeal}">click here to login</a>.`
    }
  );
  res.status(201).json({ message: `Magic Link has been sent to ${currentUser.email}` });
};
export default handleMagicLinkGeneration;
