import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Papa from "papaparse";
import ManageUsersPage from "../../pages/manage-users";
import { USER_ACTIVE } from "../constants";
const userStory = `
Given an admin,
When admin navigates to the manage user web page,
And uploads a list of new users,
Then a POST request is made with the new users.
`;
describe(userStory, () => {
  it("triggers the correct POST request", async () => {
    const { container } = render(<ManageUsersPage
      users={[]}
      seal="my-seal"
    />);
    const user = userEvent.setup();
    const usersToUpload = [
      {
        email: USER_ACTIVE.email,
        name: USER_ACTIVE.name,
        affilation: USER_ACTIVE.affilation,
        maxDownloadCount: USER_ACTIVE.maxDownloadCount,
        validFrom: USER_ACTIVE.validFrom.getTime(),
        validTo: USER_ACTIVE.validTo.getTime(),
        isActive: USER_ACTIVE.isActive,
        isAdmin: USER_ACTIVE.isAdmin
      }
    ];
    const str = Papa.unparse(usersToUpload, { header: true });
    const blob = new Blob([str]);
    const file = new File([blob], "test.csv", {
      type: "csv"
    });
    File.prototype.text = jest.fn().mockResolvedValueOnce(str);
    const inputComponent = container.querySelector("input[name=\"user_upload\"]") as HTMLElement | null;
    if (!inputComponent) {
      throw new Error("Unable to find File Upload Input Component");
    }
    expect(screen.getByRole("button", { name: "Upload" })).toBeDisabled();
    await user.upload(inputComponent, file);
    await waitFor(() => expect(screen.getByRole("button", { name: "Upload" })).not.toBeDisabled());
    await user.click(screen.getByRole("button", { name: "Upload" }));
    await waitFor(
      () => expect(global.fetch)
        .toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/user/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            seal: "my-seal",
            users: usersToUpload
          })
        })
    );
  });
});
