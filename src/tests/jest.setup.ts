import dotenv from "dotenv";
const environment = process.env.NODE_ENV === "production" ? process.env.NODE_ENV : "local";
dotenv.config({ path: `.env.${environment}` });
jest.mock("../lib/withIronSession", () => ({
  __esModule: true,
  withSessionRoute: (props: unknown) => props
}));
