import { sealData } from "iron-session";
import loginApi from "../../../pages/api/v1/login";
import postEmail from "../../../lib/postEmail";
import { USER_EXPIRED } from "../../constants";
jest.mock("iron-session");
jest.mock("../../../lib/postEmail");
describe("/login", () => {
  let status: {};
  beforeEach(async () => {
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN an expired user", () => {
    describe("WHEN a login request is made", () => {
      it("THEN the status code returns 403", async () => {
        const req = {
          method: "POST",
          body: { email: USER_EXPIRED.email },
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
        await loginApi(req, res);
        expect(sealData).not.toHaveBeenCalled();
        expect(postEmail).not.toHaveBeenCalled();
        expect(status).toHaveBeenCalledWith(403);
      });
    });
  });
});
