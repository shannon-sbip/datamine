import dotenv from "dotenv";
import { SET_INITIAL_DB_STATE } from "./api/v1/constants";
const environment = process.env.NODE_ENV === "production" ? process.env.NODE_ENV : "local";
dotenv.config({ path: `.env.${environment}` });
jest.mock("../lib/withIronSession", () => ({
  __esModule: true,
  withSessionRoute: (props: unknown) => props
}));
beforeAll(async () => {
  await SET_INITIAL_DB_STATE();
});
