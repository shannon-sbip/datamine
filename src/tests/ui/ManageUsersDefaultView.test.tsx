import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ManageUsersPage from "../../pages/manage-users";
import { ADMIN, USER_ACTIVE } from "../constants";
const userStory = `
Given an admin,
When admin navigates to the manage user web page,
Then admin sees the list of current users
`;
describe(userStory, () => {
  beforeEach(() => {
    render(<ManageUsersPage
      users={[
        {
          id: ADMIN.userId,
          email: ADMIN.email,
          name: ADMIN.name,
          affilation: ADMIN.affilation,
          isAdmin: ADMIN.isAdmin,
          validFrom: ADMIN.validFrom.getTime(),
          validTo: ADMIN.validTo.getTime()
        },
        {
          id: USER_ACTIVE.userId,
          email: USER_ACTIVE.email,
          name: USER_ACTIVE.name,
          affilation: USER_ACTIVE.affilation,
          isAdmin: USER_ACTIVE.isAdmin,
          validFrom: USER_ACTIVE.validFrom.getTime(),
          validTo: USER_ACTIVE.validTo.getTime()
        }
      ]}
      seal="my-seal"
    />);
  });
  it("shows the list of current users.", () => {
    expect(screen.getByText(ADMIN.userId)).toBeInTheDocument();
    expect(screen.getByText(ADMIN.name)).toBeInTheDocument();
    expect(screen.getByText(ADMIN.affilation)).toBeInTheDocument();
    expect(screen.getByText("TRUE")).toBeInTheDocument();
    expect(screen.getByText(ADMIN.validFrom.toISOString())).toBeInTheDocument();
    expect(screen.getByText(ADMIN.validTo.toISOString())).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.userId)).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.name)).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.affilation)).toBeInTheDocument();
    expect(screen.getByText("FALSE")).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.validFrom.toISOString())).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.validTo.toISOString())).toBeInTheDocument();
  });
  it("shows a clickable My Profile button", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "My Profile" }));
  });
});
