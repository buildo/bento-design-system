import { FieldProps } from "../Field/FieldProps";
import { useTimeField } from "@react-aria/datepicker";
import { useLocale } from "@react-aria/i18n";
import { useTimeFieldState } from "@react-stately/datepicker";
import { useRef } from "react";
import { Field } from "../Field/Field";
import { Box } from "../Box/Box";
import { inputRecipe } from "../Field/Field.css";
import { useBentoConfig } from "../BentoConfigContext";
import { DateSegment } from "./DateSegment";
import { Time } from "@internationalized/date";
import { TimeValue } from "@react-types/datepicker";

type Props = FieldProps<Time | undefined, Time> & {
  isReadOnly?: boolean;
  /** @default based on the user locale (customizable via BentoProvider) */
  hourCycle?: 12 | 24;
};

export function TimeField(props: Props) {
  const config = useBentoConfig().input;
  const { locale } = useLocale();
  const validationState = props.isReadOnly ? undefined : props.issues ? "invalid" : "valid";

  // NOTE(gabro): not sure why we need this cast, but we get a build error if we remove it
  const value = props.value as TimeValue | undefined;

  const onChange = (value: TimeValue) => {
    const time = new Time(value.hour, value.minute, value.second, value.millisecond);
    return props.onChange(time);
  };

  const state = useTimeFieldState({
    ...props,
    validationState,
    isDisabled: props.disabled,
    locale,
    value,
    onChange,
  });
  const ref = useRef<HTMLDivElement>(null);

  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useTimeField(
    {
      ...props,
      value,
      onChange,
    },
    state,
    ref
  );

  const hintProps =
    props.hint !== undefined
      ? { hint: props.hint, hintPlacement: props.hintPlacement }
      : { hint: props.hint };

  return (
    <Field
      label={props.label}
      issues={props.issues}
      disabled={props.disabled}
      assistiveText={props.assistiveText}
      labelProps={labelProps}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
      {...hintProps}
    >
      <Box
        ref={ref}
        display="flex"
        readOnly={props.isReadOnly}
        borderRadius={config.radius}
        paddingX={config.paddingX}
        paddingY={config.paddingY}
        background={config.background}
        className={inputRecipe({ validation: validationState || "notSet" })}
        disabled={props.disabled}
        {...fieldProps}
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} isReadonly={props.isReadOnly} />
        ))}
      </Box>
    </Field>
  );
}
