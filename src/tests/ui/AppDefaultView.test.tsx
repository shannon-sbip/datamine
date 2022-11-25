import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../pages/index";
const userStory = `
Given no inital state,
When user navigates to the web page,
Then user sees the static information
`;
describe(userStory, () => {
  beforeEach(() => {
    render(<App />);
  });
  it("shows the static information.", () => {
    expect(screen.getByText("Food(lg) for food intake monitoring and disease management")).toBeInTheDocument();
  });
});
