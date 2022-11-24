import userApi from "../../../pages/api/v1/user";
describe("/user", () => {
  let status: {};
  beforeEach(async () => {
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN an active user", () => {
    describe("WHEN a POST request is made without a seal", () => {
      it("THEN the status code returns 400", async () => {
        const req = {
          method: "POST",
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
