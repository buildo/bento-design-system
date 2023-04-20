import { BentoThemeProvider } from "../BentoThemeContext";
import { BentoTheme } from "./makeBentoTheme";

export function withBentoTheme<Props>(
  theme: BentoTheme,
  Component: (props: Props) => JSX.Element
): (props: Props) => JSX.Element {
  return (props: Props) => {
    return (
      <BentoThemeProvider value={theme}>
        <Component {...props} />
      </BentoThemeProvider>
    );
  };
}
