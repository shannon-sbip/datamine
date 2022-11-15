import { PrismaClient } from "@prisma/client";
import { data } from "./data/userEvent.json";
const getUserWithDateObj = (user: typeof data[0]) => ({
  ...user,
  validFrom: new Date(user.validFrom),
  validTo: new Date(user.validTo)
});
export const PRISMA = new PrismaClient();
export const ADMIN = getUserWithDateObj(data[0]);
export const USER_ACTIVE = getUserWithDateObj(data[1]);
export const USER_ACTIVE_WITH_0_MAX_DOWNLOADS = getUserWithDateObj(data[2]);
export const USER_INACTIVE = getUserWithDateObj(data[3]);
export const USER_EXPIRED = getUserWithDateObj(data[4]);
export const GET_USER_EVENT_BY_EMAIL = (email: string) => PRISMA.userEvent.findMany({
  where: {
    email: {
      equals: email
    }
  }
});
export const GET_USER_EVENTS = () => PRISMA.userEvent.findMany();
export const GET_DOWNLOADS_BY_USER = (userId: string) => PRISMA.downloadEvent.findMany({
  where: {
    userId: {
      equals: userId
    }
  }
});
export const SET_INITIAL_DB_STATE = () => PRISMA.userEvent.deleteMany()
  .then(() => Promise.all([
    PRISMA.userEvent.create({
      data: ADMIN
    }),
    PRISMA.userEvent.create({
      data: USER_ACTIVE
    }),
    PRISMA.userEvent.create({
      data: USER_INACTIVE
    }),
    PRISMA.userEvent.create({
      data: USER_ACTIVE_WITH_0_MAX_DOWNLOADS
    }),
    PRISMA.userEvent.create({
      data: USER_EXPIRED
    })
  ]))
  .then(() => PRISMA.userEvent.findMany())
  .then((result) => {
    expect(result.length).toEqual(5);
  })
  .then(() => PRISMA.downloadEvent.deleteMany())
  .then(() => PRISMA.downloadEvent.findMany())
  .then((result) => {
    expect(result.length).toEqual(0);
  })
  .catch((error) => { throw new Error(error); });
