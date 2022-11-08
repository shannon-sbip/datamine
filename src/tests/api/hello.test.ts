import helloApi from "../../pages/api/hello";
describe("/hello", () => {
  describe("Given no inital state", () => {
    describe("When a GET request is made", () => {
      it("returns John Doe", async () => {
        const json = jest.fn();
        const status = jest.fn().mockReturnValue({ json });
        const req = {
          method: "GET"
        };
        const res = {
          status
        };
        // @ts-ignore
        await helloApi(req, res);
        expect(status).toHaveBeenCalledWith(200);
        expect(json).toHaveBeenCalledWith({
          name: "John Doe"
        });
      });
    });
  });
});
