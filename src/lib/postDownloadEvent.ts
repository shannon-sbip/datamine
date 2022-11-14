import { PrismaClient, UserEvent } from "@prisma/client";
import getDownloadsFromDbByUserId from "./getDownloadsFromDbByUserId";
const postDownloadEvent = async (prisma: PrismaClient, userEvent: UserEvent) => {
  const { userId, maxDownloadCount } = userEvent;
  const downloads = await getDownloadsFromDbByUserId(prisma, userId);
  if (downloads.length < maxDownloadCount) {
    await prisma.downloadEvent.create({
      data: {
        userId
      }
    });
    return true;
  }
  return false;
};
export default postDownloadEvent;
