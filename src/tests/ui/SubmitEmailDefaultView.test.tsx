/* eslint-disable max-len */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../pages/index";
global.fetch = jest.fn().mockResolvedValue({
  status: 201,
  json: () => Promise.resolve({})
});
const userStory = `
Given no inital state,
When user navigates to the web page,
and opens modal,
Then user sees the terms of access.
`;
describe(userStory, () => {
  beforeEach(() => {
    render(<App />);
  });
  it("shows the terms of access.", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Download now" }));
    expect(screen.getByText("Terms of access")).toBeInTheDocument();
    expect(screen.getByText("Researcher shall register for dataset application.")).toBeInTheDocument();
    expect(screen.getByText("Researcher shall only use the dataset for non-commercial research and educational purposes.")).toBeInTheDocument();
    expect(screen.getByText("Researcher is not permitted to distribute copies of the dataset or grant access to the datasets to any other parties.")).toBeInTheDocument();
    expect(screen.getByText("Access to the dataset will only be granted on an individual basis. Each researcher working on a scientific project and/or publication using the dataset must submit a separate application.")).toBeInTheDocument();
    expect(screen.getByText("Citation")).toBeInTheDocument();
    expect(screen.getByText("Kindly cite the following paper if you use the dataset:")).toBeInTheDocument();
    expect(screen.getByText("A Dietary Nutrition-aided Healthcare Platform via Effective Food Recognition on a Localized Singaporean Food Dataset")).toBeInTheDocument();
    expect(screen.getByText("Kaiping Zheng, Thao Nguyen, Jesslyn Hwei Sing Chong, Charlene Enhui Goh, Melanie Herschel, Hee Hoon Lee, Beng Chin Ooi, Wei Wang, James Yip")).toBeInTheDocument();
  });
});
