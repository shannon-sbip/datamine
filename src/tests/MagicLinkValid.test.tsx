import React from "react";
import { render, screen } from "@testing-library/react";
import UserPage from "../pages/user";
import { USER_ACTIVE } from "./api/v1/constants";
const userStory = `
Given a valid user with a valid magic link,
When user navigates to the web page through the magic link,
Then user sees the profile
`;
describe(userStory, () => {
  beforeEach(() => {
    render(<UserPage user={{
      id: USER_ACTIVE.userId,
      email: USER_ACTIVE.email,
      name: USER_ACTIVE.name,
      affilation: USER_ACTIVE.affilation,
      isActive: USER_ACTIVE.isActive,
      downloadCount: 0,
      maxDownloadCount: USER_ACTIVE.maxDownloadCount,
      validFrom: USER_ACTIVE.validFrom.getTime(),
      validTo: USER_ACTIVE.validTo.getTime(),
      isAdmin: USER_ACTIVE.isAdmin
    }}
    />);
  });
  it("shows the profile.", () => {
    expect(screen.getByText(`Welcome ${USER_ACTIVE.name.toUpperCase()}!`)).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.userId)).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.email)).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.affilation)).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.maxDownloadCount)).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.validFrom.toISOString())).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.validTo.toISOString())).toBeInTheDocument();
    expect(screen.getByText("FALSE")).toBeInTheDocument();
  });
});
