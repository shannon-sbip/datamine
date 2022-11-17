import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserPage from "../../pages/user";
import { ADMIN } from "../constants";
const userStory = `
Given a valid admin user with a valid magic link,
When admin navigates to the web page through the magic link,
And clicks on the Manage Users button
Then admin navigates to the manage users page
`;
describe(userStory, () => {
  beforeEach(() => {
    render(<UserPage user={{
      email: ADMIN.email,
      name: ADMIN.name,
      affilation: ADMIN.affilation,
      isActive: ADMIN.isActive,
      downloadCount: 0,
      maxDownloadCount: ADMIN.maxDownloadCount,
      validFrom: ADMIN.validFrom.getTime(),
      validTo: ADMIN.validTo.getTime(),
      isAdmin: ADMIN.isAdmin
    }}
    />);
  });
  it("shows the profile.", () => {
    expect(screen.getByText(`Welcome ${ADMIN.name.toUpperCase()}!`)).toBeInTheDocument();
    expect(screen.getByText(ADMIN.email)).toBeInTheDocument();
    expect(screen.getByText(ADMIN.email)).toBeInTheDocument();
    expect(screen.getByText(ADMIN.affilation)).toBeInTheDocument();
    expect(screen.getByText(ADMIN.maxDownloadCount)).toBeInTheDocument();
    expect(screen.getByText(ADMIN.validFrom.toISOString())).toBeInTheDocument();
    expect(screen.getByText(ADMIN.validTo.toISOString())).toBeInTheDocument();
    expect(screen.getByText("TRUE")).toBeInTheDocument();
  });
  it("shows the Manage Users button", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Manage Users" }));
  });
});
