import React from "react";
import { render, screen } from "@testing-library/react";
import UserPage from "../../pages/user";
import { USER_ACTIVE } from "../constants";
const userStory = `
Given a valid user, with a valid magic link, and an invalid download count,
When user navigates to the web page through the magic link,
Then user sees a disabled Download Dataset button
`;
describe(userStory, () => {
  beforeEach(() => {
    render(<UserPage
      user={{
        email: USER_ACTIVE.email,
        name: USER_ACTIVE.name,
        affilation: USER_ACTIVE.affilation,
        isActive: USER_ACTIVE.isActive,
        downloadCount: USER_ACTIVE.maxDownloadCount,
        maxDownloadCount: USER_ACTIVE.maxDownloadCount,
        validFrom: USER_ACTIVE.validFrom.getTime(),
        validTo: USER_ACTIVE.validTo.getTime(),
        isAdmin: USER_ACTIVE.isAdmin
      }}
      seal="my-seal"
    />);
  });
  it("shows a disable button", async () => {
    expect(screen.getByRole("button", { name: "Download Dataset" })).toBeDisabled();
  });
});
