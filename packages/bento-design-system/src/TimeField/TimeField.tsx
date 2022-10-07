import { FieldProps } from "../Field/FieldProps";
import { useTimeField } from "@react-aria/datepicker";
import { useLocale } from "@react-aria/i18n";
import { useTimeFieldState } from "@react-stately/datepicker";
import { useRef } from "react";
import type { TimeValue } from "@react-types/datepicker";
import { Field } from "../Field/Field";
import { Box } from "../Box/Box";
import { inputRecipe } from "../Field/Field.css";
import { useBentoConfig } from "../BentoConfigContext";
import { DateSegment } from "./DateSegment";

// TODO(gabro): we probably want to limit this to Time not the whole TimeValue range
type Props = FieldProps<TimeValue | undefined, TimeValue> & {
  isReadOnly?: boolean;
  /** @default based on the user locale (customizable via BentoProvider) */
  hourCycle?: 12 | 24;
};

export function TimeField(props: Props) {
  const config = useBentoConfig().input;
  const { locale } = useLocale();
  const validationState = props.isReadOnly ? undefined : props.issues ? "invalid" : "valid";
  const state = useTimeFieldState({
    ...props,
    validationState,
    isDisabled: props.disabled,
    locale,
  });
  const ref = useRef<HTMLDivElement>(null);
  const {
    labelProps,
    // TODO(gabro)
    // fieldProps
  } = useTimeField(props, state, ref);

  console.log(state.segments);

  return (
    <Field
      label={props.label}
      issues={props.issues}
      disabled={props.disabled}
      assistiveText={props.assistiveText}
      labelProps={labelProps}
      // TODO(gabro)
      assistiveTextProps={{}}
      errorMessageProps={{}}
    >
      <Box
        ref={ref}
        display="flex"
        borderRadius={config.radius}
        paddingX={config.paddingX}
        paddingY={config.paddingY}
        className={inputRecipe({ validation: validationState || "notSet" })}
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </Box>
    </Field>
  );
}
