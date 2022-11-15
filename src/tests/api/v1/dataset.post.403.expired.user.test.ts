import * as ironSession from "iron-session";
import getS3Url from "../../../lib/getS3Url";
import datasetApi from "../../../pages/api/v1/dataset";
import { GET_DOWNLOADS_BY_USER, USER_EXPIRED } from "../../constants";
jest.mock("iron-session");
jest.mock("../../../lib/getS3Url", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue("")
}));
const USER_SEAL = "USER_SEAL";
describe("/dataset", () => {
  let status: {};
  let json: {};
  beforeEach(async () => {
    jest.spyOn(ironSession, "unsealData").mockResolvedValue({
      userId: USER_EXPIRED.userId,
      eventId: USER_EXPIRED.id
    });
    json = jest.fn().mockReturnValue(null);
    status = jest.fn().mockReturnValue({ json });
  });
  describe("GIVEN a list of users", () => {
    describe("WHEN a POST request is made with an expired user", () => {
      it("THEN the status code returns 403", async () => {
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
        expect((await GET_DOWNLOADS_BY_USER(USER_EXPIRED.userId)).length).toEqual(0);
        // @ts-ignore
        await datasetApi(req, res);
        expect(unsealData).toHaveBeenCalledWith(USER_SEAL, {
          password: process.env.SEAL_PASSWORD
        });
        expect((await GET_DOWNLOADS_BY_USER(USER_EXPIRED.userId)).length).toEqual(0);
        expect(getS3Url).not.toHaveBeenCalled();
        expect(status).toHaveBeenCalledWith(403);
        expect(json).toHaveBeenCalledWith({
          message: "User is currently not able to access the data."
        });
      });
    });
  });
});
