import { splitBy } from "../src/util/splitBy";

describe("splitBy", () => {
  it("splits a string by a predicate", () => {
    const input = [1, 2, 3, 4, 3, 2, 5];
    const output = [[1], [3, 4, 3], [5]];
    expect(splitBy(input, (a) => a === 2)).toEqual(output);
  });

  it("inserts empty arrays if the predicate matches at the edges", () => {
    const input = [2, 2, 2, 1, 2, 3, 4, 3, 2, 5, 2, 2];
    const output = [[], [], [], [1], [3, 4, 3], [5], [], []];
    expect(splitBy(input, (a) => a === 2)).toEqual(output);
  });

  it("inserts empty arrays if the predicate matches multiple times internally", () => {
    const input = [3, 4, 2, 2, 2, 3, 4];
    const output = [[3, 4], [], [], [3, 4]];
    expect(splitBy(input, (a) => a === 2)).toEqual(output);
  });

  it("returns an empty array when given an empty array", () => {
    const input = [] as number[];
    const output = [[]] as number[][];
    expect(splitBy(input, (a) => a === 2)).toEqual(output);
  });
});
