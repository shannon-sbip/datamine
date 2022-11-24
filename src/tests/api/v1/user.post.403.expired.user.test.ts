import * as ironSession from "iron-session";
import userApi from "../../../pages/api/v1/user";
import { USER_EXPIRED } from "../../constants";
jest.mock("iron-session");
const USER_SEAL = "USER_SEAL";
describe("/user", () => {
  let status: {};
  let json: {};
  beforeEach(async () => {
    jest.spyOn(ironSession, "unsealData").mockResolvedValue({
      email: USER_EXPIRED.email,
      eventId: USER_EXPIRED.id
    });
    json = jest.fn().mockReturnValue(null);
    status = jest.fn().mockReturnValue({ json });
  });
  describe("GIVEN a list of users", () => {
    describe("WHEN a POST request is made by an expired user", () => {
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
          query: {
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
        expect(status).toHaveBeenCalledWith(403);
        expect(json).toHaveBeenCalledWith({
          message: "User is currently not able to access the data."
        });
      });
    });
  });
});
