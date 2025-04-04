import { renderHook } from "@testing-library/react";
import { BentoConfigProvider, Children, createBentoProvider, useBentoConfig } from "../src";
import { defaultMessages } from "../src/defaultMessages/en";

describe("createBentoProviders", () => {
  test("the config passed as prop is merged with the one passed at creation", () => {
    const BentoProvider = createBentoProvider({ button: { uppercaseLabel: true } });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BentoProvider defaultMessages={defaultMessages} config={{ chip: { uppercase: true } }}>
        {children as Children}
      </BentoProvider>
    );

    const { result } = renderHook(() => useBentoConfig(), { wrapper });

    expect(result.current.button.uppercaseLabel).toBe(true);
    expect(result.current.chip.uppercase).toBe(true);
  });

  test("nested BentoConfigProvider partially overrides the BentoProvider config", () => {
    const BentoProvider = createBentoProvider();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BentoProvider
        defaultMessages={defaultMessages}
        config={{ button: { uppercaseLabel: true } }}
      >
        <BentoConfigProvider value={{ chip: { uppercase: true } }}>
          {children as Children}
        </BentoConfigProvider>
      </BentoProvider>
    );

    const { result } = renderHook(() => useBentoConfig(), { wrapper });

    expect(result.current.button.uppercaseLabel).toBe(true);
    expect(result.current.chip.uppercase).toBe(true);
  });
});
