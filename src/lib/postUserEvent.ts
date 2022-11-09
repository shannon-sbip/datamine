import { PrismaClient, UserEvent } from "@prisma/client";
const postUserEvent = async (prisma: PrismaClient, userEvents: UserEvent[]) => {
  const promises = Promise.all(userEvents.map((event) => prisma.userEvent.create({
    data: {
      ...event,
      validFrom: new Date(event.validFrom),
      validTo: new Date(event.validTo)
    }
  })));
  return promises.then(() => true);
};
export default postUserEvent;
