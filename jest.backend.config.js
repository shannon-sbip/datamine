/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],
  setupFiles: [
    "dotenv/config"
  ],
  testPathIgnorePatterns: [
    "/bootstrap-next-typescript/",
    "/node_modules/"
  ],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: [
    "./src/pages/api/**/*.ts"
  ]
};
