/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "\\.tsx?$": ["babel-jest", { configFile: "./babel-jest.config.js" }],
  },
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
};
