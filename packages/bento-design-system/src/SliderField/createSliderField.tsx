import { useNumberFormatter } from "@react-aria/i18n";
import { useSlider } from "@react-aria/slider";
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
  autoFocus?: boolean;
} & FormatProps;

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

    const state = useSliderState({
      ...props,
      ...valueProps,
      numberFormatter,
    });

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
