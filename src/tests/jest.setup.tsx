// eslint-disable-next-line import/no-extraneous-dependencies
import "@testing-library/jest-dom/extend-expect";
import { ReactNode } from "react";
jest.mock("next/head", () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode[] }) => children
}));
global.fetch = jest.fn();
global.window = Object.create(window);
Object.defineProperty(window, "location", {
  value: {
    reload: jest.fn()
  }
});
