import * as ironSession from "iron-session";
import datasetApi from "../../../pages/api/v1/dataset";
import { USER_ACTIVE_WITH_0_MAX_DOWNLOADS } from "../../constants";
jest.mock("iron-session");
const USER_ACTIVE_SEAL = "USER_ACTIVE_SEAL";
describe("/user", () => {
  let status: {};
  beforeEach(async () => {
    jest.spyOn(ironSession, "unsealData").mockResolvedValue({
      email: USER_ACTIVE_WITH_0_MAX_DOWNLOADS.email,
      eventId: USER_ACTIVE_WITH_0_MAX_DOWNLOADS.id
    });
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN an active user with max downloads reached", () => {
    describe("WHEN a POST request is made with valid seal", () => {
      it("THEN the status code returns 403", async () => {
        const { unsealData } = ironSession;
        const req = {
          method: "POST",
          body: {
            seal: USER_ACTIVE_SEAL
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
        expect(unsealData).toHaveBeenCalledWith(USER_ACTIVE_SEAL, {
          password: process.env.SEAL_PASSWORD
        });
        expect(status).toHaveBeenCalledWith(403);
      });
    });
  });
});
