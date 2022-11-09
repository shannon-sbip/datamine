import * as ironSession from "iron-session";
import userApi from "../../../pages/api/v1/user";
jest.mock("iron-session");
const USER_SEAL = "USER_SEAL";
describe("/user", () => {
  let status: {};
  beforeEach(async () => {
    jest.spyOn(ironSession, "unsealData").mockResolvedValue({
      userId: "unknown_user",
      eventId: "some_id"
    });
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN a list of users", () => {
    describe("WHEN a GET request is made with a seal containing a user that do not exist", () => {
      it("THEN the status code returns 404", async () => {
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
        expect(status).toHaveBeenCalledWith(404);
      });
    });
  });
});
