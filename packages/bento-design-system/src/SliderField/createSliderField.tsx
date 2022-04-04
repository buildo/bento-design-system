import { useLabel } from "@react-aria/label";
import { FunctionComponent } from "react";
import { FieldType } from "../Field/createField";
import { FieldProps } from "../Field/FieldProps";
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
    const { labelProps, fieldProps } = useLabel(props);
    return (
      <Field {...props} labelProps={labelProps} assistiveTextProps={{}} errorMessageProps={{}}>
        <Slider {...props} fieldProps={fieldProps} />
      </Field>
    );
  };
}

export type { Props as SliderFieldProps };
