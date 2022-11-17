import * as ironSession from "iron-session";
import { getServerSideProps } from "../../pages/manage-users";
import { USER_EXPIRED } from "../constants";
jest.mock("iron-session");
const USER_SEAL = "USER_SEAL";
describe("/manage-users", () => {
  describe("GIVEN a list of users", () => {
    describe("WHEN a request is made by an expired user", () => {
      it("THEN page not found", async () => {
        jest.spyOn(ironSession, "unsealData").mockResolvedValue({
          email: USER_EXPIRED.email,
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
          notFound: true
        });
      });
    });
  });
});
