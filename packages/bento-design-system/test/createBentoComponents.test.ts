import { bentoSprinkles, createBentoComponents } from "../src";

describe("createBentoComponents", () => {
  test("works without arguments ", () => {
    const { Button } = createBentoComponents();
    expect(Button).toBeDefined();
  });

  test("works with only config", () => {
    const { Button } = createBentoComponents({
      button: { uppercaseLabel: false },
    });
    expect(Button).toBeDefined();
  });

  test("works with only sprinkles", () => {
    const { Button } = createBentoComponents(bentoSprinkles);
    expect(Button).toBeDefined();
  });

  test("works with config and sprinkles", () => {
    const { Button } = createBentoComponents(bentoSprinkles, {
      button: { uppercaseLabel: false },
    });
    expect(Button).toBeDefined();
  });
});
