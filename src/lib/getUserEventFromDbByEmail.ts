import { PrismaClient } from "@prisma/client";
const getUserEventFromDbByEmail = (prisma: PrismaClient, email: string) => prisma.userEvent.findFirst({
  where: {
    email: {
      equals: email
    }
  },
  orderBy: {
    createdAt: "desc"
  }
});
export default getUserEventFromDbByEmail;
