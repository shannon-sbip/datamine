import { PrismaClient } from "@prisma/client";
import { User } from "../types/user";
const getDistinctUsersFromDb = async (prisma: PrismaClient): Promise<Partial<User>[]> => {
  const userEvents = await prisma.userEvent.findMany({
    where: {},
    distinct: ["email"],
    orderBy: {
      createdAt: "desc"
    }
  });
  const now = (new Date()).getTime();
  const users = userEvents.reduce((acc, {
    userId, name, affilation, email, isActive, isAdmin, validFrom, validTo
  }) => {
    if (!isActive) {
      return acc;
    }
    const range = [
      validFrom.getTime(),
      validTo.getTime()
    ];
    if (now >= range[0] && now <= range[1]) {
      acc.push({
        id: userId,
        email,
        name,
        affilation,
        isAdmin,
        validFrom: (new Date(validFrom)).getTime(),
        validTo: (new Date(validTo)).getTime()
      });
    }
    return acc;
  }, [] as Partial<User>[]);
  return users;
};
export default getDistinctUsersFromDb;
