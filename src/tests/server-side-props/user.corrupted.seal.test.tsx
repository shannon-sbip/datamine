import * as ironSession from "iron-session";
import { getServerSideProps } from "../../pages/user";
jest.mock("iron-session");
const USER_SEAL = "seal";
describe("/user", () => {
  describe("GIVEN an active user", () => {
    describe("WHEN a request is made with a corrupted seal", () => {
      it("THEN no user profile is sent to client", async () => {
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
          props: {
            user: null
          }
        });
      });
    });
  });
});
