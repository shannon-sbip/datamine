import React, { ReactNode } from "react";
import {
  fireEvent, render, screen, waitFor
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../pages/index";
import { ADMIN, USER_ACTIVE } from "../constants";
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: () => ({
    query: {
      seal: "seal"
    }
  }),
  default: ({ children }: { children: ReactNode[] }) => children
}));
global.fetch = jest.fn()
  .mockResolvedValueOnce({
    status: 200,
    json: () => Promise.resolve({
      data: {
        email: ADMIN.email,
        name: ADMIN.name,
        affilation: ADMIN.affilation,
        isActive: ADMIN.isActive,
        downloadCount: 0,
        maxDownloadCount: ADMIN.maxDownloadCount,
        validFrom: ADMIN.validFrom.getTime(),
        validTo: ADMIN.validTo.getTime(),
        isAdmin: ADMIN.isAdmin
      }
    })
  }).mockResolvedValueOnce({
    status: 200,
    json: () => Promise.resolve({
      data: []
    })
  });
const userStory = `
Given an admin,
When admin navigates to the manage user web view and update user view,
And upload a user,
Then a POST request is made with the new user.
`;
describe(userStory, () => {
  it("triggers the correct POST request", async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitFor(() => expect(screen.getByText(`Welcome ${ADMIN.name.toUpperCase()}!`)).toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: "Manage Users" }));
    await user.click(screen.getByRole("button", { name: "Update Users" }));
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
    await user.type(screen.getByRole("textbox", { name: "Email" }), USER_ACTIVE.email);
    await user.type(screen.getByRole("textbox", { name: "Name" }), USER_ACTIVE.name);
    await user.type(screen.getByRole("textbox", { name: "Affilation" }), USER_ACTIVE.affilation);
    await user.type(screen.getByRole("spinbutton", { name: "Max Downloads" }), `${USER_ACTIVE.maxDownloadCount}`);
    expect(screen.getByRole("spinbutton", { name: "Max Downloads" })).toHaveValue(2);
    await fireEvent.change(
      screen.getByLabelText("Valid From"),
      {
        target: {
          value: USER_ACTIVE.validFrom.toLocaleString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }).replace(" ", "T")
        }
      }
    );
    await fireEvent.change(
      screen.getByLabelText("Valid To"),
      {
        target: {
          value: USER_ACTIVE.validTo.toLocaleString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }).replace(" ", "T")
        }
      }
    );
    if (USER_ACTIVE.isActive) await user.click(screen.getByRole("checkbox", { name: "Is Active" }));
    if (USER_ACTIVE.isAdmin) await user.click(screen.getByRole("checkbox", { name: "Is Admin" }));
    await user.click(screen.getByRole("button", { name: "Update" }));
    await waitFor(
      () => expect(global.fetch)
        .toHaveBeenNthCalledWith(3, `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/user/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            seal: "seal",
            users: usersToUpload
          })
        })
    );
  });
});
