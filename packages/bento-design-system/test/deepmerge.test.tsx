import { deepmerge } from "../src/BentoConfigContext";

describe("deepmerge", () => {
  it("merges two objects", () => {
    const input1 = { a: 1, b: 2 };
    const input2 = { c: 3, d: 4 };
    const output = { a: 1, b: 2, c: 3, d: 4 };
    expect(deepmerge(input1, input2)).toEqual(output);
  });

  it("does not merge two arrays", () => {
    const input1 = [1, 2, 3];
    const input2 = [4, 5, 6];
    expect(deepmerge(input1, input2)).toEqual(input2);
  });

  it("does not merge object fields that are valid React elements", () => {
    const input1 = { a: 1, b: 2 };
    const input2 = <div>hello</div>;
    expect(deepmerge(input1, input2)).toEqual(input2);
  });
});
