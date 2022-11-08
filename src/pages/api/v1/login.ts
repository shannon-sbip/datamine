import { PrismaClient } from "@prisma/client";
import { sealData, unsealData } from "iron-session";
import type { NextApiRequest, NextApiResponse } from "next";
import postEmail from "../../../lib/postEmail";
import { withSessionRoute } from "../../../lib/withIronSession";
type Data = {
  message: string
}
const prisma = new PrismaClient();
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Invalid login request." });
    return;
  }
  const { seal } = req.query || {};
  const userSeal = seal ? String(seal) : "";
  if (userSeal) {
    // Handle magic link
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
    return;
  }
  // Handle magic link generation
  const { email } = req.body || {};
  if (!email) {
    res.status(400).json({ message: "Invalid login request." });
    return;
  }
  const currentUser = await prisma.userEvent.findFirst({
    where: {
      email: {
        equals: email as string
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
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
      Body: `Hey there ${currentUser.name}, <a href="${process.env.NEXT_PUBLIC_APP_URL}/api/v1/login?seal=${newSeal}">click here to login</a>.`
    }
  );
  res.status(201).json({ message: `Magic Link has been sent to ${currentUser.email}` });
};
export default withSessionRoute(handler);
