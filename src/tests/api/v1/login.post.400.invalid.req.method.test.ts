import loginApi from "../../../pages/api/v1/login";
jest.mock("../../../lib/postEmail");
describe("/login", () => {
  let status: {};
  beforeEach(async () => {
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN no initial state", () => {
    describe("WHEN a GET login request is made", () => {
      it("THEN the status code returns 400", async () => {
        const req = {
          method: "GET",
          body: {
            email: "test@email.com"
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
        expect(status).toHaveBeenCalledWith(400);
      });
    });
  });
});
