import React, { ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../../pages/index";
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
  json: () => Promise.resolve(null)
});
const userStory = `
Given an invalid magic link,
When user navigates to the web page through the magic link,
Then user sees the message to generate a new link
`;
describe(userStory, () => {
  it("shows the message to generate a new link", async () => {
    render(<App />);
    await waitFor(() => screen.getByText("This link is no longer valid, please generate a new Magic Link."));
  });
});
