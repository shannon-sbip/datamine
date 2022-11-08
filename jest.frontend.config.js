/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./"
});
module.exports = createJestConfig({
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.tsx"],
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1"
  },
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: [
    "/bootstrap-next-typescript/",
    "/node_modules/",
    "/.next/",
    "/api"
  ],
  collectCoverageFrom: [
    "./src/**/*.tsx"
  ],
  coverageThreshold: {
    global: {
      lines: 90
    }
  },
  coveragePathIgnorePatterns: []
});
