import { BentoThemeOverride, BentoThemeProvider } from "../BentoThemeContext";
import { BoxProps } from "../Box/Box";

type WrapperProps = {
  as?: BoxProps["as"];
  className?: string;
};

export function withBentoTheme<Props>(
  theme: BentoThemeOverride,
  Component: (props: Props) => JSX.Element,
  wrapper?: WrapperProps
): (props: Props) => JSX.Element {
  return (props: Props) => {
    return (
      <BentoThemeProvider theme={theme} {...wrapper}>
        <Component {...props} />
      </BentoThemeProvider>
    );
  };
}
