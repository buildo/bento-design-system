// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// NOTE: despite the name, jest-dom also works with vitest
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";

declare module "vitest" {
  interface Assertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
}

expect.extend(matchers);
