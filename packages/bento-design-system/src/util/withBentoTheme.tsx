import { PartialBentoTheme } from "..";
import { BentoThemeProvider } from "../BentoThemeContext";

export function withBentoTheme<Props>(
  config: PartialBentoTheme,
  Component: (props: Props) => JSX.Element
): (props: Props) => JSX.Element {
  return (props: Props) => {
    return (
      <BentoThemeProvider value={config}>
        <Component {...props} />
      </BentoThemeProvider>
    );
  };
}
