import {
  Column,
  Columns,
  Field,
  IconButton,
  IconMinus,
  IconPlus,
  NumberFieldProps,
  BaseNumberInput,
} from "@buildo/bento-design-system";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@react-aria/i18n";
import { useNumberFieldState } from "@react-stately/numberfield";
import { useNumberField } from "@react-aria/numberfield";

export function CounterField(props: Omit<NumberFieldProps, "kind" | "currency">) {
  const { t } = useTranslation();
  const step = props.step ?? 1;
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const inputRef = useRef<HTMLInputElement>(null);

  const validationState = props.issues ? "invalid" : "valid";

  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useNumberField(
    {
      ...props,
      errorMessage: props.issues,
      description: props.assistiveText,
      isDisabled: props.disabled,
      isReadOnly: props.isReadOnly,
      validationState,
    },
    state,
    inputRef
  );

  return (
    <Field
      {...props}
      labelProps={labelProps}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      <Columns space={8} alignY="bottom">
        <Column width="content">
          <IconButton
            kind="solid"
            hierarchy="secondary"
            icon={IconMinus}
            size={16}
            label={t("CounterField.decrement")}
            onPress={() => {
              const newValue = (props.value ?? 0) - step;
              if (!props.minValue || newValue >= props.minValue) {
                props.onChange(newValue);
              } else {
                props.onChange(props.minValue);
              }
            }}
          />
        </Column>
        <BaseNumberInput
          inputProps={inputProps}
          inputRef={inputRef}
          validationState={validationState}
          {...props}
        />
        <Column width="content">
          <IconButton
            kind="solid"
            hierarchy="secondary"
            icon={IconPlus}
            size={16}
            label={t("CounterField.increment")}
            onPress={() => {
              const newValue = (props.value ?? 0) + step;
              if (!props.maxValue || newValue <= props.maxValue) {
                props.onChange(newValue);
              } else {
                props.onChange(props.maxValue);
              }
            }}
          />
        </Column>
      </Columns>
    </Field>
  );
}
