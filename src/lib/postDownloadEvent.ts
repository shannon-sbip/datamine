import { PrismaClient } from "@prisma/client";
const postDownloadEvent = (prisma: PrismaClient, userId: string) => prisma.downloadEvent.create({
  data: {
    userId
  }
});
export default postDownloadEvent;
