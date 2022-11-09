import userUpdateApi from "../../../pages/api/v1/user/update";
import { USER_ACTIVE } from "./constants";
describe("/user/update", () => {
  let status: {};
  beforeEach(async () => {
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN an active user", () => {
    describe("WHEN a GET request is made", () => {
      it("THEN the status code returns 400", async () => {
        const req = {
          method: "GET",
          body: {
            email: USER_ACTIVE.email
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
        await userUpdateApi(req, res);
        expect(status).toHaveBeenCalledWith(400);
      });
    });
  });
});
