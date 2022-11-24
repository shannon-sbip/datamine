import { PrismaClient } from "@prisma/client";
import { get } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import handleMagicLink from "../../../lib/handleMagicLink";
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
    const { seal } = req.query || {};
    const userSeal = seal ? String(seal) : "";
    if (userSeal) {
      await handleMagicLink({
        prisma,
        userSeal,
        req,
        res
      });
      return;
    }
    await handleMagicLinkGeneration({
      prisma,
      req,
      res
    });
  } catch (e) {
    if (process.env.NODE_ENV === "development" && get(e, "errno") === -111) {
      res.status(201).json({
        message: "LocalStack is not running. Check the server console for the magic link."
      });
    } else {
      res.status(500).json({ message: `Something went wrong. (${JSON.stringify(e)})` });
    }
  }
};
export default handler;
