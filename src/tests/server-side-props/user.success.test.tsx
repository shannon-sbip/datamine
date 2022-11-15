import * as ironSession from "iron-session";
import { getServerSideProps } from "../../pages/user";
import { USER_ACTIVE } from "../constants";
jest.mock("iron-session");
const USER_SEAL = "USER_SEAL";
describe("/user", () => {
  describe("GIVEN a list of users", () => {
    describe("WHEN a request is made with a valid seal", () => {
      it("THEN the user profile is sent to client", async () => {
        jest.spyOn(ironSession, "unsealData").mockResolvedValue({
          userId: USER_ACTIVE.userId,
          eventId: USER_ACTIVE.id
        });
        const { unsealData } = ironSession;
        // @ts-ignore
        const result = await getServerSideProps({
          query: {
            seal: USER_SEAL
          }
        });
        expect(unsealData).toHaveBeenCalledWith(USER_SEAL, {
          password: process.env.SEAL_PASSWORD
        });
        expect(result).toEqual({
          props: {
            seal: USER_SEAL,
            user: {
              id: USER_ACTIVE.userId,
              email: USER_ACTIVE.email,
              name: USER_ACTIVE.name,
              affilation: USER_ACTIVE.affilation,
              downloadCount: 0,
              maxDownloadCount: USER_ACTIVE.maxDownloadCount,
              validFrom: USER_ACTIVE.validFrom.getTime(),
              validTo: USER_ACTIVE.validTo.getTime(),
              isActive: USER_ACTIVE.isActive,
              isAdmin: USER_ACTIVE.isAdmin
            }
          }
        });
      });
    });
  });
});
