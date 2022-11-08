/* eslint-disable no-unused-vars */
import { UserEvent } from "@prisma/client";
declare module "iron-session" {
  interface IronSessionData {
    user?: UserEvent;
  }
}
