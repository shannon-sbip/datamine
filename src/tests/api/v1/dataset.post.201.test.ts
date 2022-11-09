import * as ironSession from "iron-session";
import getS3Url from "../../../lib/getS3Url";
import datasetApi from "../../../pages/api/v1/dataset";
import { GET_DOWNLOADS_BY_USER, USER_ACTIVE } from "./constants";
jest.mock("iron-session");
jest.mock("../../../lib/getS3Url", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue("")
}));
const USER_SEAL = "USER_SEAL";
describe("/user", () => {
  let status: {};
  let json: {};
  beforeEach(async () => {
    jest.spyOn(ironSession, "unsealData").mockResolvedValue({
      userId: USER_ACTIVE.userId,
      eventId: USER_ACTIVE.id
    });
    json = jest.fn().mockReturnValue(null);
    status = jest.fn().mockReturnValue({ json });
  });
  describe("GIVEN a list of users", () => {
    describe("WHEN a POST request is made with a valid seal", () => {
      it("THEN the status code returns 201, download event created, and s3 url sent to client", async () => {
        const { unsealData } = ironSession;
        const req = {
          method: "POST",
          body: {
            seal: USER_SEAL
          },
          headers: {
            cookie: ""
          },
          session: {
          }
        };
        const res = {
          status
        };
        expect((await GET_DOWNLOADS_BY_USER(USER_ACTIVE.userId)).length).toEqual(0);
        // @ts-ignore
        await datasetApi(req, res);
        expect(unsealData).toHaveBeenCalledWith(USER_SEAL, {
          password: process.env.SEAL_PASSWORD
        });
        expect((await GET_DOWNLOADS_BY_USER(USER_ACTIVE.userId)).length).toEqual(1);
        expect(getS3Url).toHaveBeenCalled();
        expect(status).toHaveBeenCalledWith(201);
        expect(json).toHaveBeenCalledWith({
          message: "Success.",
          data: {
            url: ""
          }
        });
      });
    });
  });
});
