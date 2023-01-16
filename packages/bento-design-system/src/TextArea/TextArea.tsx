import { useTextField } from "@react-aria/textfield";
import { useRef } from "react";
import { Box, Field } from "..";
import { LocalizedString } from "../util/LocalizedString";
import { inputRecipe } from "../Field/Field.css";
import { FieldProps } from "../Field/FieldProps";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { useBentoConfig } from "../BentoConfigContext";
import { getReadOnlyBackgroundStyle } from "../Field/utils";

type Props = FieldProps<string> & {
  placeholder: LocalizedString;
  isReadOnly?: boolean;
  rows?: number;
};

export function TextArea(props: Props) {
  const config = useBentoConfig().input;
  const inputRef = useRef<HTMLInputElement>(null);

  const validationState = props.isReadOnly ? undefined : props.issues ? "invalid" : "valid";

  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    {
      ...props,
      errorMessage: props.issues,
      description: props.assistiveText,
      validationState,
      isDisabled: props.disabled,
    },
    inputRef
  );

  return (
    <Field
      {...props}
      labelProps={labelProps}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      <Box
        as="textarea"
        ref={inputRef}
        {...inputProps}
        // NOTE(gabro): this is to please TS, since the inputProps type is very broad
        color={undefined}
        width={undefined}
        height={undefined}
        borderRadius={config.radius}
        paddingX={config.paddingX}
        paddingY={config.paddingY}
        background={config.background.default}
        rows={props.rows}
        className={[
          inputRecipe({ validation: validationState || "notSet" }),
          bodyRecipe({
            color: props.disabled ? "disabled" : "primary",
            weight: "default",
            size: config.fontSize,
          }),
        ]}
        style={getReadOnlyBackgroundStyle(config)}
      />
    </Field>
  );
}

export type { Props as TextAreaProps };
