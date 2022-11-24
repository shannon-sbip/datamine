import * as ironSession from "iron-session";
import userUpdateApi from "../../../pages/api/v1/user/update";
jest.mock("iron-session");
const USER_SEAL = "USER_SEAL";
describe("/user/update", () => {
  let status: {};
  beforeEach(async () => {
    jest.spyOn(ironSession, "unsealData").mockResolvedValue(null);
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN a list of users", () => {
    describe("WHEN a POST request is made with an invalid seal", () => {
      it("THEN the status code returns 404", async () => {
        const { unsealData } = ironSession;
        const req = {
          method: "POST",
          body: {
            seal: USER_SEAL
          },
          headers: {
            cookie: ""
          },
          query: {
          }
        };
        const res = {
          status
        };
          // @ts-ignore
        await userUpdateApi(req, res);
        expect(unsealData).toHaveBeenCalledWith(USER_SEAL, {
          password: process.env.SEAL_PASSWORD
        });
        expect(status).toHaveBeenCalledWith(404);
      });
    });
  });
});
