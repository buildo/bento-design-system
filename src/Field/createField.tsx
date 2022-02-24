import { ComponentProps, ElementType, HTMLAttributes, LabelHTMLAttributes } from "react";
import { Body } from "../Typography/Body/Body";
import { Label } from "../Typography/Label/Label";
import { Stack, Box, BentoSprinkles } from "../internal";
import { Children } from "../util/Children";
import { FieldProps } from "./FieldProps";

type Props = Pick<FieldProps<never>, "issues" | "disabled" | "assistiveText" | "hint"> & {
  /** The field label rendered on screen. Can be omitted in case of fields that have a custom label, such as CheckboxField  */
  label?: FieldProps<never>["label"];
  /** The dom element used to render the label. Defaults to <label>, but can be customized for fields that are group of inputs, like RadioGroup.
   *  @default "label"
   */
  labelElement?: ElementType<any>;
  /** Props that gets spread on the label element, usually coming from a react-aria utility */
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  /** Props that gets spread on the assistiveText , usually coming from a react-aria utility (note: react-aria usually calls them descriptionProps) */
  assistiveTextProps: HTMLAttributes<HTMLElement>;
  /** Props that gets spread on the errorMessage element , usually coming from a react-aria utility */
  errorMessageProps: HTMLAttributes<HTMLElement>;
  /** The field element */
  children: Children;
};

export type FieldType = React.FunctionComponent<Props>;
export type FieldConfig = {
  label: {
    size: ComponentProps<typeof Label>["size"];
  };
  assistiveText: {
    size: ComponentProps<typeof Body>["size"];
    paddingLeft: BentoSprinkles["paddingX"];
  };
  internalSpacing: BentoSprinkles["gap"];
};

/**
 * A utility for rendering a form field with a label, a description and error message, alongside their accessibility props.
 * This is meant as an internal design system utility for implementing form fields.
 */
export function createField(config: FieldConfig) {
  return function Field({
    label,
    assistiveText,
    issues,
    labelProps,
    assistiveTextProps,
    errorMessageProps,
    children,
    disabled,
    labelElement = "label",
  }: Props) {
    return (
      <Box disabled={disabled} cursor={{ disabled: "notAllowed" }}>
        <Stack space={config.internalSpacing}>
          {label && (
            <Label
              as={labelElement}
              {...labelProps}
              size={config.label.size}
              color={disabled ? "disabled" : "secondary"}
            >
              {label}
            </Label>
          )}
          {children}
          {assistiveText && !issues && (
            <Box paddingLeft={config.assistiveText.paddingLeft}>
              <Body
                {...assistiveTextProps}
                size={config.assistiveText.size}
                color={disabled ? "disabled" : "secondary"}
              >
                {assistiveText}
              </Body>
            </Box>
          )}
          {issues && (
            <Box paddingLeft={config.assistiveText.paddingLeft}>
              <Stack space={4}>
                {issues.map((errorMessage, index) => (
                  <Box {...errorMessageProps} color={undefined}>
                    <Body key={index} size={config.assistiveText.size} color="negative">
                      {errorMessage}
                    </Body>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>
    );
  };
}
