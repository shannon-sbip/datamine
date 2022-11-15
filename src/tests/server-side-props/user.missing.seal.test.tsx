import * as ironSession from "iron-session";
import { getServerSideProps } from "../../pages/user";
jest.mock("iron-session");
const USER_SEAL = undefined;
describe("/user", () => {
  describe("GIVEN an active user", () => {
    describe("WHEN a request is made without a seal", () => {
      it("THEN no user profile is sent to client", async () => {
        const { unsealData } = ironSession;
        // @ts-ignore
        const result = await getServerSideProps({
          query: {
            seal: USER_SEAL
          }
        });
        expect(unsealData).not.toHaveBeenCalled();
        expect(result).toEqual({
          props: {
            user: null
          }
        });
      });
    });
  });
});
