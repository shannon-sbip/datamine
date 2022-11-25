import React, { ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
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
global.fetch = jest.fn().mockResolvedValueOnce({
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
    data: [
      {
        email: ADMIN.email,
        name: ADMIN.name,
        affilation: ADMIN.affilation,
        isAdmin: ADMIN.isAdmin,
        validFrom: ADMIN.validFrom.getTime(),
        validTo: ADMIN.validTo.getTime()
      },
      {
        email: USER_ACTIVE.email,
        name: USER_ACTIVE.name,
        affilation: USER_ACTIVE.affilation,
        isAdmin: USER_ACTIVE.isAdmin,
        validFrom: USER_ACTIVE.validFrom.getTime(),
        validTo: USER_ACTIVE.validTo.getTime()
      }
    ]
  })
});
const userStory = `
Given an admin,
When admin navigates to the manage user web page,
Then admin sees the list of current users
`;
describe(userStory, () => {
  it("shows the list of current users.", async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitFor(() => expect(screen.getByText(`Welcome ${ADMIN.name.toUpperCase()}!`)).toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: "Manage Users" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "My Profile" })));
    expect(screen.getByText(ADMIN.email)).toBeInTheDocument();
    expect(screen.getByText(ADMIN.name)).toBeInTheDocument();
    expect(screen.getByText(ADMIN.affilation)).toBeInTheDocument();
    expect(screen.getByText("TRUE")).toBeInTheDocument();
    expect(screen.getByText(ADMIN.validFrom.toISOString())).toBeInTheDocument();
    expect(screen.getByText(ADMIN.validTo.toISOString())).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.email)).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.name)).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.affilation)).toBeInTheDocument();
    expect(screen.getByText("FALSE")).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.validFrom.toISOString())).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.validTo.toISOString())).toBeInTheDocument();
  });
});
