import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../pages";
global.fetch = jest.fn().mockResolvedValue({
  status: 201,
  json: () => Promise.resolve({})
});
const userStory = `
Given no inital state,
When user navigates to the web page,
and enters email,
and clicks submit,
Then user sees the statement to check inbox.
`;
describe(userStory, () => {
  beforeEach(() => {
    render(<App />);
  });
  it("shows the statement to check inbox.", async () => {
    const user = userEvent.setup();
    const emailInput = screen.getByRole("textbox");
    await user.type(emailInput, "validated-email@email.com");
    const submitButton = screen.getByRole("button");
    await user.click(submitButton);
    expect(screen.getByText("Your magic link has been sent to your inbox.")).toBeInTheDocument();
  });
});
