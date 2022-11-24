import loginApi from "../../../pages/api/v1/login";
jest.mock("../../../lib/postEmail");
describe("/login", () => {
  let status: {};
  beforeEach(async () => {
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN no initial state", () => {
    describe("WHEN a valid login request is made", () => {
      it("THEN the status code returns 404", async () => {
        const req = {
          method: "POST",
          body: {
            email: "non-existent-user@email.com"
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
        await loginApi(req, res);
        expect(status).toHaveBeenCalledWith(404);
      });
    });
  });
});
