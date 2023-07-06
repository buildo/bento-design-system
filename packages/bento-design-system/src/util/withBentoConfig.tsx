import { PartialBentoConfig } from "..";
import { BentoConfigProvider } from "../BentoConfigContext";

export function withBentoConfig<Props extends JSX.IntrinsicAttributes>(
  config: PartialBentoConfig,
  Component: (props: Props) => JSX.Element
): (props: Props) => JSX.Element {
  return (props: Props) => {
    return (
      <BentoConfigProvider value={config}>
        <Component {...props} />
      </BentoConfigProvider>
    );
  };
}
