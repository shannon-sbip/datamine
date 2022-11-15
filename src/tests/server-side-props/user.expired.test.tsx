import * as ironSession from "iron-session";
import { getServerSideProps } from "../../pages/user";
import { USER_EXPIRED } from "../constants";
jest.mock("iron-session");
const USER_SEAL = "USER_SEAL";
describe("/user", () => {
  describe("GIVEN a list of users", () => {
    describe("WHEN a request is made by an expired user", () => {
      it("THEN no user profile is sent to the client", async () => {
        jest.spyOn(ironSession, "unsealData").mockResolvedValue({
          userId: USER_EXPIRED.userId,
          eventId: USER_EXPIRED.id
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
            user: null
          }
        });
      });
    });
  });
});
