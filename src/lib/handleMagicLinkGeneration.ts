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
  const range = [
    currentUser.validFrom.getTime(),
    currentUser.validTo.getTime()
  ];
  const now = (new Date()).getTime();
  if (now < range[0] || now > range[1]) {
    res.status(403).json({ message: "User is currently not able to access the data." });
    return;
  }
  const newSeal = await sealData({
    email: currentUser.email,
    eventId: currentUser.id
  }, {
    password: process.env.SEAL_PASSWORD || ""
  });
  const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/user?seal=${newSeal}`;
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(magicLink);
  }
  postEmail(
    {
      email: currentUser.email,
      subject: "Magic Link",
      Body: `Hey there ${currentUser.name}, <a href="${magicLink}">click here to login</a>.`
    }
  );
  res.status(201).json({ message: `Magic Link has been sent to ${currentUser.email}` });
};
export default handleMagicLinkGeneration;
