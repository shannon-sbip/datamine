import * as ironSession from "iron-session";
import loginApi from "../../../pages/api/v1/login";
import { USER_ACTIVE } from "../../constants";
jest.mock("iron-session");
jest.mock("../../../lib/postEmail");
const USER_ACTIVE_SEAL = "USER_ACTIVE_SEAL";
describe("/login", () => {
  let status: {};
  beforeEach(async () => {
    jest.spyOn(ironSession, "unsealData").mockResolvedValue({
      email: USER_ACTIVE.email,
      eventId: USER_ACTIVE.id
    });
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN an active user", () => {
    describe("WHEN a valid login request with magic link is made", () => {
      it("THEN the session is created and the status code returns 200", async () => {
        const { unsealData } = ironSession;
        const req = {
          method: "POST",
          query: {
            seal: USER_ACTIVE_SEAL
          },
          body: {
          },
          headers: {
            cookie: ""
          }
        };
        const res = {
          status
        };
        // @ts-ignore
        await loginApi(req, res);
        expect(unsealData).toHaveBeenCalledWith(USER_ACTIVE_SEAL, {
          password: process.env.SEAL_PASSWORD
        });
        expect(status).toHaveBeenCalledWith(200);
      });
    });
  });
});
