import * as ironSession from "iron-session";
import { getServerSideProps } from "../../pages/manage-users";
jest.mock("iron-session");
const USER_SEAL = undefined;
describe("/manage-users", () => {
  describe("GIVEN an active user", () => {
    describe("WHEN a request is made without a seal", () => {
      it("THEN page not found", async () => {
        const { unsealData } = ironSession;
        // @ts-ignore
        const result = await getServerSideProps({
          query: {
            seal: USER_SEAL
          }
        });
        expect(unsealData).not.toHaveBeenCalled();
        expect(result).toEqual({
          notFound: true
        });
      });
    });
  });
});
