import { PrismaClient } from "@prisma/client";
import { sealData } from "iron-session";
import type { NextApiRequest, NextApiResponse } from "next";
import postEmail from "../../../lib/postEmail";
import { withSessionRoute } from "../../../lib/withIronSession";
type Data = {
  message: string
}
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email } = req.body;
  if (req.method !== "POST" || !email) {
    res.status(400).json({ message: "Invalid login request." });
    return;
  }
  const prisma = new PrismaClient();
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
  const seal = await sealData({
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
      Body: `Hey there ${currentUser.name}, <a href="${process.env.NEXT_PUBLIC_APP_URL}/api/v1/login?seal=${seal}">click here to login</a>.`
    }
  );
  res.status(200).json({ message: `Magic Link has been sent to ${currentUser.email}` });
};
export default withSessionRoute(handler);
