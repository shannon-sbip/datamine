import React, { ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../../pages/index";
import { USER_ACTIVE } from "../constants";
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: () => ({
    query: {
      seal: "seal"
    }
  }),
  default: ({ children }: { children: ReactNode[] }) => children
}));
global.fetch = jest.fn().mockResolvedValue({
  status: 200,
  json: () => Promise.resolve({
    data: {
      email: USER_ACTIVE.email,
      name: USER_ACTIVE.name,
      affilation: USER_ACTIVE.affilation,
      isActive: USER_ACTIVE.isActive,
      downloadCount: 0,
      maxDownloadCount: USER_ACTIVE.maxDownloadCount,
      validFrom: USER_ACTIVE.validFrom.getTime(),
      validTo: USER_ACTIVE.validTo.getTime(),
      isAdmin: USER_ACTIVE.isAdmin
    }
  })
});
const userStory = `
Given a valid user with a valid magic link,
When user navigates to the web page through the magic link,
Then user sees the profile
`;
describe(userStory, () => {
  it("shows the profile.", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(`Welcome ${USER_ACTIVE.name.toUpperCase()}!`)).toBeInTheDocument());
    expect(screen.getByText(USER_ACTIVE.email)).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.affilation)).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.maxDownloadCount)).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.validFrom.toISOString())).toBeInTheDocument();
    expect(screen.getByText(USER_ACTIVE.validTo.toISOString())).toBeInTheDocument();
    expect(screen.getByText("FALSE")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Get Dataset Url" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Manage Users" })).not.toBeInTheDocument();
  });
});
