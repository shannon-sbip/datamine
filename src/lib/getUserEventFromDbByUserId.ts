import { PrismaClient } from "@prisma/client";
const getUserEventFromDbByUserId = (prisma: PrismaClient, userId: string) => prisma.userEvent.findFirst({
  where: {
    userId: {
      equals: userId
    }
  },
  orderBy: {
    createdAt: "desc"
  }
});
export default getUserEventFromDbByUserId;
