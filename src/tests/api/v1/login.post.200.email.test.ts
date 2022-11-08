import loginApi from "../../../pages/api/v1/login";
import postEmail from "../../../lib/postEmail";
import { USER_ACTIVE } from "./constants";
jest.mock("../../../lib/postEmail");
describe("/login", () => {
  let status: {};
  beforeEach(async () => {
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN an active user", () => {
    describe("WHEN a valid login request is made", () => {
      it("THEN the email with magic link is triggered and the status code returns 200", async () => {
        const req = {
          method: "POST",
          body: { email: USER_ACTIVE.email },
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
        await loginApi(req, res);
        expect(postEmail).toHaveBeenCalled();
        expect(status).toHaveBeenCalledWith(200);
      });
    });
  });
});
