import * as ironSession from "iron-session";
import userUpdateApi from "../../../pages/api/v1/user/update";
import { GET_USER_EVENTS, USER_EXPIRED } from "../../constants";
jest.mock("iron-session");
const USER_SEAL = "USER_SEAL";
describe("/user/update", () => {
  let status: {};
  let json: {};
  beforeEach(async () => {
    jest.spyOn(ironSession, "unsealData").mockResolvedValue({
      userId: USER_EXPIRED.userId,
      eventId: USER_EXPIRED.id
    });
    json = jest.fn().mockReturnValue(null);
    status = jest.fn().mockReturnValue({ json });
  });
  describe("GIVEN an admin user", () => {
    describe("WHEN a POST request is made with an expired Admin", () => {
      it("THEN the status code returns 403", async () => {
        const { unsealData } = ironSession;
        const req = {
          method: "POST",
          body: {
            seal: USER_SEAL,
            users: [
              {
                email: "user_1@example.com",
                name: "user_1",
                affilation: "affilation1",
                maxDownloadCount: 1,
                validFrom: 1667870996000,
                validTo: 1667870996000,
                isActive: true
              }
            ]
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
        const userEventsBefore = await GET_USER_EVENTS();
        // @ts-ignore
        await userUpdateApi(req, res);
        const userEventsAfter = await GET_USER_EVENTS();
        expect(userEventsAfter.length).toEqual(userEventsBefore.length);
        expect(unsealData).toHaveBeenCalledWith(USER_SEAL, {
          password: process.env.SEAL_PASSWORD
        });
        expect(status).toHaveBeenCalledWith(403);
      });
    });
  });
});
