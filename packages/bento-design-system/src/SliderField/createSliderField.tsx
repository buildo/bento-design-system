import { useNumberFormatter } from "@react-aria/i18n";
import { useSlider } from "@react-aria/slider";
import { clamp } from "@react-aria/utils";
import { useSliderState } from "@react-stately/slider";
import { useRef, FunctionComponent } from "react";
import { FieldType } from "../Field/createField";
import { FieldProps } from "../Field/FieldProps";
import { useFormatOptions } from "../NumberInput/formatOptions";
import { FormatProps } from "../NumberInput/FormatProps";
import { SliderProps } from "../Slider/createSlider";

type Props = (
  | ({ type: "single" } & FieldProps<number>)
  | ({
      type: "double";
    } & FieldProps<[number, number]>)
) & {
  minValue: number;
  maxValue: number;
  step?: number;
  dragStep?: number;
  autoFocus?: boolean;
  hideThumbLabel?: boolean;
} & FormatProps;

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step;
}

export function createSliderField({
  Field,
  Slider,
}: {
  Field: FieldType;
  Slider: FunctionComponent<SliderProps>;
}) {
  return function SliderField(props: Props) {
    const trackRef = useRef<HTMLDivElement>(null);
    const formatOptions = useFormatOptions(props);
    const numberFormatter = useNumberFormatter(formatOptions);
    const valueProps =
      props.type === "double"
        ? {
            value: props.value,
            onChange: (values: number[]) => props.onChange([values[0], values[1]]),
          }
        : {
            value: [props.value],
            onChange: (values: number[]) => props.onChange(values[0]),
          };

    const internalState = useSliderState({
      ...props,
      ...valueProps,
      numberFormatter,
    });
    const state = props.dragStep
      ? {
          ...internalState,
          setThumbPercent: (index: number, percent: number) => {
            const minValue = state.getThumbMinValue(index);
            const maxValue = state.getThumbMaxValue(index);
            const value = percent * (maxValue - minValue) + minValue;
            const roundedValue =
              // NOTE: we round up to the nearest dragStep first, and then to the nearest step.
              // This is required in case a dragStep falls on values that are not allowed
              // e.g. if the dragStep is not a multiple of the step
              roundToStep(roundToStep(value - minValue, props.dragStep!), props.step || 1) +
              minValue;
            const clampedValue = clamp(roundedValue, minValue, maxValue);
            state.setThumbValue(index, clampedValue);
          },
        }
      : internalState;

    const { groupProps, trackProps, outputProps, labelProps } = useSlider(
      { ...props, ...valueProps },
      state,
      trackRef
    );

    return (
      <Field {...props} labelProps={labelProps} assistiveTextProps={{}} errorMessageProps={{}}>
        <Slider
          {...props}
          trackRef={trackRef}
          groupProps={groupProps}
          trackProps={trackProps}
          outputProps={outputProps}
          state={state}
          numberFormatter={numberFormatter}
        />
      </Field>
    );
  };
}

export type { Props as SliderFieldProps };
