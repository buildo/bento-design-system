import { useTextField } from "@react-aria/textfield";
import { useRef } from "react";
import { bentoSprinkles, Box } from "../internal";
import { LocalizedString } from "../util/LocalizedString";
import { inputRecipe } from "../Field/Field.css";
import { FieldProps } from "../Field/FieldProps";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { Field } from "../Field/Field";
import { BoxProps } from "src";

type Props = FieldProps<string> & {
  placeholder: LocalizedString;
  type?: "text" | "email" | "url" | "search";
  disabled?: boolean;
};

type TextFieldConfig<AtomsFn extends typeof bentoSprinkles> = {
  padding: BoxProps<AtomsFn>["padding"];
  radius: BoxProps<AtomsFn>["borderRadius"];
};

export function createTextField<AtomsFn extends typeof bentoSprinkles>(
  config: TextFieldConfig<AtomsFn>
) {
  return function TextField(props: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const validationState = props.issues ? "invalid" : "valid";

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
          as="input"
          type={props.type || "text"}
          ref={inputRef}
          {...inputProps}
          // NOTE(gabro): this is to please TS, since the inputProps type is very broad
          color={undefined}
          width={undefined}
          height={undefined}
          borderRadius={config.radius}
          padding={config.padding}
          className={[
            inputRecipe({ validation: validationState }),
            bodyRecipe({
              color: props.disabled ? "disabled" : "default",
              weight: "regular",
              size: "large",
            }),
          ]}
        />
      </Field>
    );
  };
}
