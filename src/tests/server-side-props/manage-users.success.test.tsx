import * as ironSession from "iron-session";
import { getServerSideProps } from "../../pages/manage-users";
import { ADMIN, USER_ACTIVE, USER_ACTIVE_WITH_0_MAX_DOWNLOADS } from "../constants";
jest.mock("iron-session");
const USER_SEAL = "USER_SEAL";
describe("/manage-user", () => {
  describe("GIVEN a list of users", () => {
    describe("WHEN a request is made with a valid seal", () => {
      it("THEN the list of users are sent to the client", async () => {
        jest.spyOn(ironSession, "unsealData").mockResolvedValue({
          email: ADMIN.email,
          eventId: ADMIN.id
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
            users: ((users) => users.map((user) => ({
              email: user.email,
              name: user.name,
              affilation: user.affilation,
              validFrom: user.validFrom.getTime(),
              validTo: user.validTo.getTime(),
              isAdmin: user.isAdmin
            })))([USER_ACTIVE_WITH_0_MAX_DOWNLOADS, USER_ACTIVE, ADMIN])
          }
        });
      });
    });
  });
});
