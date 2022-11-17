import { PrismaClient, UserEvent } from "@prisma/client";
import getDownloadsFromDbByEmail from "./getDownloadsFromDbByEmail";
const postDownloadEvent = async (prisma: PrismaClient, userEvent: UserEvent) => {
  const { email, maxDownloadCount } = userEvent;
  const downloads = await getDownloadsFromDbByEmail(prisma, email);
  if (downloads.length < maxDownloadCount) {
    await prisma.downloadEvent.create({
      data: {
        email
      }
    });
    return true;
  }
  return false;
};
export default postDownloadEvent;
