import React, { ReactNode } from "react";
import {
  render, screen, waitFor
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import downloadjs from "downloadjs";
import App from "../../pages/index";
import { USER_ACTIVE } from "../constants";
jest.mock("downloadjs");
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
});
const userStory = `
Given a valid user, with a valid magic link, and a valid download count,
When user navigates to the web page through the magic link,
And clicks the Download Dataset button
Then user downloads the dataset
`;
describe(userStory, () => {
  it("downloads the dataset", async () => {
    render(<App />);
    const user = userEvent.setup();
    await waitFor(() => expect(screen.getByRole("button", { name: "Download Dataset" })).not.toBeDisabled());
    await user.click(screen.getByRole("button", { name: "Download Dataset" }));
    expect(global.fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/dataset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        seal: "seal"
      })
    });
    expect(downloadjs).toHaveBeenCalledWith("url");
  });
});
