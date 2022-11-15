import loginApi from "../../../pages/api/v1/login";
import { USER_INACTIVE } from "../../constants";
jest.mock("../../../lib/postEmail");
describe("/login", () => {
  let status: {};
  beforeEach(async () => {
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN a user that is inactive", () => {
    describe("WHEN a valid login request is made", () => {
      it("THEN the status code returns 404", async () => {
        const req = {
          method: "POST",
          body: {
            email: USER_INACTIVE.email
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
        await loginApi(req, res);
        expect(status).toHaveBeenCalledWith(404);
      });
    });
  });
});
