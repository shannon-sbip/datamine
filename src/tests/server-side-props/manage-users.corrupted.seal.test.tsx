import * as ironSession from "iron-session";
import { getServerSideProps } from "../../pages/manage-users";
jest.mock("iron-session");
const USER_SEAL = "seal";
describe("/manage-users", () => {
  describe("GIVEN an active user", () => {
    describe("WHEN a request is made with a corrupted seal", () => {
      it("THEN page not found", async () => {
        jest.spyOn(ironSession, "unsealData").mockResolvedValue(null);
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
          notFound: true
        });
      });
    });
  });
});
