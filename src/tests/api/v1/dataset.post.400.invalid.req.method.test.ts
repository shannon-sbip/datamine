import datasetApi from "../../../pages/api/v1/dataset";
import { USER_ACTIVE } from "../../constants";
describe("/dataset", () => {
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
          query: {
          }
        };
        const res = {
          status
        };
        // @ts-ignore
        await datasetApi(req, res);
        expect(status).toHaveBeenCalledWith(400);
      });
    });
  });
});
