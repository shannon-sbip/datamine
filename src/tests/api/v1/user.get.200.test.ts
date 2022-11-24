import * as ironSession from "iron-session";
import userApi from "../../../pages/api/v1/user";
import { USER_ACTIVE } from "../../constants";
jest.mock("iron-session");
const USER_SEAL = "USER_SEAL";
describe("/user", () => {
  let status: {};
  let json: {};
  beforeEach(async () => {
    jest.spyOn(ironSession, "unsealData").mockResolvedValue({
      email: USER_ACTIVE.email,
      eventId: USER_ACTIVE.id
    });
    json = jest.fn().mockReturnValue(null);
    status = jest.fn().mockReturnValue({ json });
  });
  describe("GIVEN a list of users", () => {
    describe("WHEN a GET request is made with a valid seal", () => {
      it("THEN the status code returns 200, and the user profile is sent to client", async () => {
        const { unsealData } = ironSession;
        const req = {
          method: "GET",
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
          // @ts-ignore
        await userApi(req, res);
        expect(unsealData).toHaveBeenCalledWith(USER_SEAL, {
          password: process.env.SEAL_PASSWORD
        });
        expect(status).toHaveBeenCalledWith(200);
        expect(json).toHaveBeenCalledWith({
          message: "Success.",
          data: {
            email: USER_ACTIVE.email,
            name: USER_ACTIVE.name,
            affilation: USER_ACTIVE.affilation,
            downloadCount: 0,
            maxDownloadCount: USER_ACTIVE.maxDownloadCount,
            validFrom: USER_ACTIVE.validFrom.getTime(),
            validTo: USER_ACTIVE.validTo.getTime()
          }
        });
      });
    });
  });
});
