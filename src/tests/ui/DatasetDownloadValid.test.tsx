import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import downloadjs from "downloadjs";
import UserPage from "../../pages/user";
import { USER_ACTIVE } from "../constants";
jest.mock("downloadjs");
global.fetch = jest.fn().mockResolvedValue({
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
  beforeEach(() => {
    render(<UserPage
      user={{
        email: USER_ACTIVE.email,
        name: USER_ACTIVE.name,
        affilation: USER_ACTIVE.affilation,
        isActive: USER_ACTIVE.isActive,
        downloadCount: 0,
        maxDownloadCount: USER_ACTIVE.maxDownloadCount,
        validFrom: USER_ACTIVE.validFrom.getTime(),
        validTo: USER_ACTIVE.validTo.getTime(),
        isAdmin: USER_ACTIVE.isAdmin
      }}
      seal="my-seal"
    />);
  });
  it("downloads the dataset", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Download Dataset" }));
    expect(global.fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/dataset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        seal: "my-seal"
      })
    });
    expect(downloadjs).toHaveBeenCalledWith("url");
  });
});
