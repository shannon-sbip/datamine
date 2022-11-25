import React, { ReactNode } from "react";
import {
  act, render, screen, waitFor
} from "@testing-library/react";
import App from "../../pages/index";
import { ADMIN } from "../constants";
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
});
const userStory = `
Given a valid admin user with a valid magic link,
When admin navigates to the web page through the magic link,
And clicks on the Manage Users button
Then admin navigates to the manage users page
`;
describe(userStory, () => {
  it("shows the profile.", async () => {
    act(() => {
      render(<App />);
    });
    await waitFor(() => expect(screen.getByText(`Welcome ${ADMIN.name.toUpperCase()}!`)).toBeInTheDocument());
    expect(screen.getByText(ADMIN.email)).toBeInTheDocument();
    expect(screen.getByText(ADMIN.affilation)).toBeInTheDocument();
    expect(screen.getByText(ADMIN.maxDownloadCount)).toBeInTheDocument();
    expect(screen.getByText(ADMIN.validFrom.toISOString())).toBeInTheDocument();
    expect(screen.getByText(ADMIN.validTo.toISOString())).toBeInTheDocument();
    expect(screen.getByText("TRUE")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Manage Users" }));
  });
});
