import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import handleMagicLinkGeneration from "../../../lib/handleMagicLinkGeneration";
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
  try {
    await handleMagicLinkGeneration({
      prisma,
      req,
      res
    });
  } catch (e) {
    res.status(500).json({ message: `Something went wrong. (${JSON.stringify(e)})` });
  }
};
export default handler;
