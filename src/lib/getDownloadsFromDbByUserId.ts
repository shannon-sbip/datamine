import { PrismaClient } from "@prisma/client";
const getDownloadsFromDbByUserId = (prisma: PrismaClient, userId: string) => prisma.downloadEvent.findMany({
  where: {
    userId: {
      equals: userId
    }
  },
  orderBy: {
    createdAt: "desc"
  }
});
export default getDownloadsFromDbByUserId;
