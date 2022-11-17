import { PrismaClient } from "@prisma/client";
const getDownloadsFromDbByEmail = (prisma: PrismaClient, email: string) => prisma.downloadEvent.findMany({
  where: {
    email: {
      equals: email
    }
  },
  orderBy: {
    createdAt: "desc"
  }
});
export default getDownloadsFromDbByEmail;
