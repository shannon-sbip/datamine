import userApi from "../../../pages/api/v1/user";
import { USER_ACTIVE } from "../../constants";
describe("/user", () => {
  let status: {};
  beforeEach(async () => {
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN an active user", () => {
    describe("WHEN a POST request is made", () => {
      it("THEN the status code returns 400", async () => {
        const req = {
          method: "POST",
          body: {
            email: USER_ACTIVE.email
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
        expect(status).toHaveBeenCalledWith(400);
      });
    });
  });
});
