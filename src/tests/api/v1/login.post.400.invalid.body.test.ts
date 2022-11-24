import loginApi from "../../../pages/api/v1/login";
jest.mock("../../../lib/postEmail");
describe("/login", () => {
  let status: {};
  beforeEach(async () => {
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN no initial state", () => {
    describe("WHEN a login request is made without any data", () => {
      it("THEN the status code returns 400", async () => {
        const req = {
          method: "POST",
          body: {
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
        expect(status).toHaveBeenCalledWith(400);
      });
    });
  });
});
