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
  const magicLink = `${process.env.APP_URL}/?seal=${newSeal}`;
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(magicLink);
  }
  const response = await postEmail(
    {
      email: currentUser.email,
      subject: "[no-reply] Food SG 233 Magic Link",
      body: `Hey there ${currentUser.name}, <a href="${magicLink}">click here to login</a>.`
    }
  );
  if (response.$metadata.httpStatusCode === 200) {
    res.status(201).json({
      message: `Magic Link has been sent to ${currentUser.email}, by ${process.env.NEXT_PUBLIC_EMAIL_SOURCE}.`
    });
  } else {
    res.status(500).json({ message: "Something went wrong with the email service" });
  }
};
export default handleMagicLinkGeneration;
