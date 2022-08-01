import { useProgressBar } from "@react-aria/progress";
import { Box, Columns } from "../internal";
import { LocalizedString } from "../util/LocalizedString";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { ProgressBarConfig } from "./Config";
import { barRecipe } from "./ProgressBar.css";

type Props = {
  label?: LocalizedString;
  kind: "continuous" | "discrete";
  value: number;
  maxValue: number;
};

export function createProgressBar(config: ProgressBarConfig) {
  type BarProps = ({ discrete: true; width?: never } | { discrete?: false; width: number }) & {
    active?: boolean;
  };
  function Bar(props: BarProps) {
    return (
      <Box
        borderRadius={props.discrete ? config.radius : undefined}
        className={barRecipe({ active: props.active ?? false })}
        style={{ width: props.discrete ? undefined : `${props.width}%`, height: config.height }}
      />
    );
  }

  return function ProgressBar(props: Props) {
    const { defaultMessages } = useDefaultMessages();
    const { progressBarProps } = useProgressBar({
      ...props,
      label: props.label || defaultMessages.Loader.loadingMessage,
    });
    return props.kind === "discrete" ? (
      <Columns {...progressBarProps} space={config.discreteInternalSpacing}>
        {Array.from({ length: props.maxValue }, (_, i) => i).map((step) => (
          <Bar key={step} discrete active={step < props.value} />
        ))}
      </Columns>
    ) : (
      <Box {...progressBarProps} display="flex" borderRadius={config.radius} overflow="hidden">
        <Bar active width={(props.value / props.maxValue) * 100} />
        <Bar width={((props.maxValue - props.value) / props.maxValue) * 100} />
      </Box>
    );
  };
}

export type { Props as ProgressBarProps };
