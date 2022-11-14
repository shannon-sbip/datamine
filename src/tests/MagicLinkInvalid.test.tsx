import React from "react";
import { render, screen } from "@testing-library/react";
import UserPage from "../pages/user";
const userStory = `
Given an invalid magic link,
When user navigates to the web page through the magic link,
Then user sees the message to generate a new link
`;
describe(userStory, () => {
  beforeEach(() => {
    render(<UserPage user={null} />);
  });
  it("shows the message to generate a new link", () => {
    expect(screen.getByText("This link is no longer valid, please generate a new Magic Link.")).toBeInTheDocument();
  });
});
