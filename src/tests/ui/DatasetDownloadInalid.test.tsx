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
      downloadCount: USER_ACTIVE.maxDownloadCount,
      maxDownloadCount: USER_ACTIVE.maxDownloadCount,
      validFrom: USER_ACTIVE.validFrom.getTime(),
      validTo: USER_ACTIVE.validTo.getTime(),
      isAdmin: USER_ACTIVE.isAdmin
    }
  })
});
const userStory = `
Given a valid user, with a valid magic link, and an invalid download count,
When user navigates to the web page through the magic link,
Then user sees a disabled Get Dataset Url button
`;
describe(userStory, () => {
  it("shows a disable button", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Get Dataset Url" })).toBeDisabled());
  });
});
