import { useNumberFormatter } from "@react-aria/i18n";
import { useSlider, AriaSliderProps } from "@react-aria/slider";
import { clamp } from "@react-aria/utils";
import { useSliderState } from "@react-stately/slider";
import { ValueBase } from "@react-types/shared";
import { useRef } from "react";
import { Field, Slider } from "..";
import { FieldProps } from "../Field/FieldProps";
import { useFormatOptions } from "../NumberField/formatOptions";
import { FormatProps } from "../NumberField/types";

type Props = (
  | ({
      type: "single";
      /**
       * Invoked when the user stops dragging the slider.
       * This is different from onChange, which is called continuously while dragging.
       */
      onChangeEnd?: (value: number) => void;
    } & FieldProps<number>)
  | ({
      type: "double";
      onChangeEnd?: (value: [number, number]) => void;
    } & FieldProps<[number, number]>)
) & {
  minValue: number;
  maxValue: number;
  step?: number;
  dragStep?: number;
  hideThumbValue?: boolean;
} & FormatProps;

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step;
}

export function SliderField(props: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const formatOptions = useFormatOptions(props);
  const numberFormatter = useNumberFormatter(formatOptions);

  const valueProps: ValueBase<number | number[]> & Pick<AriaSliderProps, "onChangeEnd"> = {
    value: props.value,
    onChange: (values: number | number[]) => {
      if (typeof values === "number" && props.type === "single") {
        props.onChange(values);
      }
      if (Array.isArray(values) && props.type === "double") {
        props.onChange(values as [number, number]);
      }
    },
    onChangeEnd: (values: number | number[]) => {
      if (typeof values === "number" && props.type === "single") {
        props.onChangeEnd?.(values);
      }
      if (Array.isArray(values) && props.type === "double") {
        props.onChangeEnd?.(values as [number, number]);
      }
    },
  };

  const { value, onChange, onChangeEnd, ...internalProps } = props;

  const internalState = useSliderState<number | number[]>({
    ...internalProps,
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
            roundToStep(roundToStep(value - minValue, props.dragStep!), props.step || 1) + minValue;
          const clampedValue = clamp(roundedValue, minValue, maxValue);
          state.setThumbValue(index, clampedValue);
        },
      }
    : internalState;

  const { groupProps, trackProps, outputProps, labelProps } = useSlider(
    { ...internalProps, ...valueProps },
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
}

export type { Props as SliderFieldProps };
