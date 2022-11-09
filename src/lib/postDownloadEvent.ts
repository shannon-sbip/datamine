import { PrismaClient, UserEvent } from "@prisma/client";
const postDownloadEvent = async (prisma: PrismaClient, userEvent: UserEvent) => {
  const { userId, maxDownloadCount } = userEvent;
  const downloads = await prisma.downloadEvent.findMany({
    where: {
      userId: {
        equals: userId
      }
    }
  });
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
