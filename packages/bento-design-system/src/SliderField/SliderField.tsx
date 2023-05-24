import { useNumberFormatter } from "@react-aria/i18n";
import { useSlider, AriaSliderProps } from "@react-aria/slider";
import { clamp } from "@react-aria/utils";
import { useSliderState } from "@react-stately/slider";
import { ValueBase } from "@react-types/shared";
import { useRef } from "react";
import { Columns, LocalizedString, NumberField, Slider, Stack } from "..";
import { FieldProps } from "../Field/FieldProps";
import { useFormatOptions } from "../NumberInput/formatOptions";
import { FormatProps } from "../NumberInput/FormatProps";

type Props = (
  | ({
      type: "single";
      /**
       * Invoked when the user stops dragging the slider.
       * This is different from onChange, which is called continuously while dragging.
       */
      onChangeEnd?: (value: number) => void;
      placeholder: string;
    } & FieldProps<number>)
  | ({
      type: "double";
      onChangeEnd?: (value: [number, number]) => void;
      labels: [FieldProps<never>["label"], FieldProps<never>["label"]];
      placeholders: [LocalizedString, LocalizedString];
      hints?: [FieldProps<never>["hint"], FieldProps<never>["hint"]];
      assistiveTexts?: [FieldProps<never>["assistiveText"], FieldProps<never>["assistiveText"]];
      issues?: [FieldProps<never>["issues"], FieldProps<never>["issues"]];
      initialValue?: [number, number];
    } & Omit<FieldProps<[number, number]>, "label" | "hint" | "assistiveText" | "issues">)
) & {
  minValue: number;
  maxValue: number;
  step?: number;
  dragStep?: number;
  hideThumbValue?: boolean;
  isReadOnly?: boolean;
} & FormatProps;

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step;
}

function SingleInput(props: Props & { type: "single" }) {
  const hintProps = props.hint ? { hint: props.hint } : {};
  return (
    <NumberField
      label={props.label}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
      isReadOnly={props.isReadOnly}
      minValue={props.minValue}
      maxValue={props.maxValue}
      assistiveText={props.assistiveText}
      issues={props.issues}
      {...hintProps}
    />
  );
}

function DoubleInput(props: Props & { type: "double" }) {
  const minHintProps = props.hints?.[0] ? { hint: props.hints[0] } : {};
  const maxHintProps = props.hints?.[1] ? { hint: props.hints[1] } : {};
  return (
    <Columns space={24}>
      <NumberField
        label={props.labels[0]}
        placeholder={props.placeholders[0]}
        value={props.value?.[0]}
        onChange={(newVal) => props.onChange([newVal, props.value[1]])}
        disabled={props.disabled}
        isReadOnly={props.isReadOnly}
        minValue={props.minValue}
        maxValue={props.value?.[1]}
        assistiveText={props.assistiveTexts?.[0]}
        issues={props.issues?.[0]}
        {...minHintProps}
      />
      <NumberField
        label={props.labels[1]}
        placeholder={props.placeholders[1]}
        value={props.value?.[1]}
        onChange={(newVal) => props.onChange([props.value[0], newVal])}
        disabled={props.disabled}
        isReadOnly={props.isReadOnly}
        minValue={props.value?.[0]}
        maxValue={props.maxValue}
        assistiveText={props.assistiveTexts?.[1]}
        issues={props.issues?.[1]}
        {...maxHintProps}
      />
    </Columns>
  );
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

  const { groupProps, trackProps, outputProps } = useSlider(
    { ...internalProps, ...valueProps },
    state,
    trackRef
  );

  return (
    <Stack space={8}>
      {props.type === "single" ? <SingleInput {...props} /> : <DoubleInput {...props} />}
      <Slider
        {...props}
        trackRef={trackRef}
        groupProps={groupProps}
        trackProps={trackProps}
        outputProps={outputProps}
        state={state}
        numberFormatter={numberFormatter}
      />
    </Stack>
  );
}

export type { Props as SliderFieldProps };
