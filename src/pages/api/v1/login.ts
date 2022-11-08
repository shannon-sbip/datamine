import { PrismaClient } from "@prisma/client";
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
  postEmail();
  res.status(200).json({ message: `Magic Link has been sent to ${currentUser.email}` });
};
export default withSessionRoute(handler);
