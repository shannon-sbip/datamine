import React, { ReactNode } from "react";
import {
  render, screen, waitFor
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
global.fetch = jest.fn().mockResolvedValueOnce({
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
}).mockResolvedValueOnce({
  status: 201,
  json: () => Promise.resolve({ data: { url: "url" } })
}).mockResolvedValueOnce({
  status: 200,
  json: () => Promise.resolve({
    data: {
      email: USER_ACTIVE.email,
      name: USER_ACTIVE.name,
      affilation: USER_ACTIVE.affilation,
      isActive: USER_ACTIVE.isActive,
      downloadCount: 1,
      maxDownloadCount: USER_ACTIVE.maxDownloadCount,
      validFrom: USER_ACTIVE.validFrom.getTime(),
      validTo: USER_ACTIVE.validTo.getTime(),
      isAdmin: USER_ACTIVE.isAdmin
    }
  })
});
const userStory = `
Given a valid user, with a valid magic link, and a valid download count,
When user navigates to the web page through the magic link,
And clicks the Get Dataset Url button
Then user is able to download the dataset
`;
describe(userStory, () => {
  it("downloads the dataset", async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitFor(() => expect(screen.getByRole("button", { name: "Get Dataset Url" })).not.toBeDisabled());
    await user.click(screen.getByRole("button", { name: "Get Dataset Url" }));
    expect(global.fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/dataset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        seal: "seal"
      })
    });
    await waitFor(() => expect(screen.getByRole("button", { name: "Download Now" })).toBeInTheDocument());
    expect(screen.getByText("Download Now").closest("a")).toHaveAttribute("href", "url");
  });
});
