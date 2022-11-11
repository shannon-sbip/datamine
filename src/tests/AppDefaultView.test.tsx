import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../pages";
import getMetaContent from "../lib/getMetaContent";
global.fetch = jest.fn();
const userStory = `
Given no inital state,
When user navigates to the web page,
Then user sees the static information
`;
describe(userStory, () => {
  beforeEach(() => {
    render(<App />);
  });
  it("shows the static information.", () => {
    expect(screen.getByText("Enter your email to recieve your magic link.")).toBeInTheDocument();
  });
  it("shows the correct headers", () => {
    const titleCollection = document.getElementsByTagName("title");
    expect(titleCollection[0].text).toEqual("Datamine");
    const metaCollection = document.getElementsByTagName("meta");
    const titleMeta = getMetaContent(0, (metaCollection as unknown) as HTMLMetaElement[], "title");
    expect(titleMeta)
      .toEqual("");
    const descriptionMeta = getMetaContent(0, (metaCollection as unknown) as HTMLMetaElement[], "description");
    expect(descriptionMeta)
      .toEqual("Distributing datasets through magic links.");
  });
});
