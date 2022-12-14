import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../pages/index";
global.fetch = jest.fn().mockResolvedValue({
  status: 404,
  json: () => Promise.resolve({})
});
const userStory = `
Given no inital state,
When user navigates to the web page,
and opens modal,
and enters an unverified email,
and clicks submit,
Then user sees an error message.
`;
describe(userStory, () => {
  beforeEach(() => {
    render(<App />);
  });
  it("shows the error message", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Download now" }));
    const emailInput = screen.getByRole("textbox");
    await user.type(emailInput, "unvalidated-email@email.com");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await user.click(submitButton);
    expect(screen.getByText("The email you entered does not exist in our database.")).toBeInTheDocument();
  });
});
