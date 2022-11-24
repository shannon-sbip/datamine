import userApi from "../../../pages/api/v1/user";
describe("/user", () => {
  let status: {};
  beforeEach(async () => {
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN an active user", () => {
    describe("WHEN a GET request is made without a seal", () => {
      it("THEN the status code returns 400", async () => {
        const req = {
          method: "GET",
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
        await userApi(req, res);
        expect(status).toHaveBeenCalledWith(400);
      });
    });
  });
});
