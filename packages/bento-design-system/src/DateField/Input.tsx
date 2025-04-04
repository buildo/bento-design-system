import { createCalendar } from "@internationalized/date";
import {
  AriaDatePickerProps,
  DateValue,
  useDateField,
  useDateSegment,
} from "@react-aria/datepicker";
import { useLocale } from "@react-aria/i18n";
import {
  DateFieldState,
  DateSegment as DateSegmentType,
  useDateFieldState,
} from "@react-stately/datepicker";
import { useRef } from "react";
import { Box } from "../Box/Box";
import { inputRecipe } from "../Field/Field.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { useBentoConfig } from "../BentoConfigContext";
import { getRadiusPropsFromConfig } from "../util/BorderRadiusConfig";
import { Body } from "../Typography/Body/Body";
import { Inline } from "../Layout/Inline";
import { IconCalendar, IconMinus } from "../Icons";
import { AriaButtonProps } from "@react-types/button";
import { IconButton } from "../IconButton/IconButton";
import { getReadOnlyBackgroundStyle } from "../Field/utils";
import { match, P } from "ts-pattern";
import { dateFieldRecipe, dateSegment } from "./DateField.css";
import { ValidationState } from "@react-types/shared";
import { Column, Columns } from "../Layout/Columns";

type Props = (
  | { type: "single"; fieldProps: AriaDatePickerProps<DateValue> }
  | {
      type: "range";
      fieldProps: {
        start: AriaDatePickerProps<DateValue>;
        end: AriaDatePickerProps<DateValue>;
      };
    }
) & {
  buttonProps: AriaButtonProps<"button">;
  isCalendarOpen: boolean;
};

function DateSegment({ segment, state }: { segment: DateSegmentType; state: DateFieldState }) {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);
  const config = useBentoConfig().input;

  return (
    <Box
      {...segmentProps}
      ref={ref}
      className={dateSegment}
      readOnly={state.isReadOnly}
      // Note: we override aria-disabled and data-placeholder because they're not set for dividers
      aria-disabled={state.isDisabled}
      data-placeholder={!state.value}
    >
      <Body size={config.fontSize} color="inherit">
        {segment.text}
      </Body>
    </Box>
  );
}

function DateField({ fieldProps }: { fieldProps: AriaDatePickerProps<DateValue> }) {
  const { locale } = useLocale();
  const ref = useRef(null);
  const state = useDateFieldState({
    ...fieldProps,
    locale,
    createCalendar,
  });
  const { fieldProps: dateFieldProps } = useDateField(fieldProps, state, ref);
  return (
    <Box {...dateFieldProps} ref={ref}>
      <Inline space={0}>
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </Inline>
    </Box>
  );
}

export function Input(props: Props) {
  const config = useBentoConfig().input;
  const dateFieldConfig = useBentoConfig().dateField;

  const { validationState, isDisabled, isReadOnly } = match(props)
    .with({ type: "single" }, (props) => {
      return {
        validationState: props.fieldProps.isReadOnly
          ? "notSet"
          : props.fieldProps.validationState ?? "notSet",
        isDisabled: props.fieldProps.isDisabled,
        isReadOnly: props.fieldProps.isReadOnly,
      } as const;
    })
    .with({ type: "range" }, (props) => {
      const isReadOnly = props.fieldProps.start.isReadOnly && props.fieldProps.end.isReadOnly;
      const validationState: ValidationState | "notSet" = isReadOnly
        ? ("notSet" as const)
        : match([
            props.fieldProps.start.validationState,
            props.fieldProps.end.validationState,
          ] as const)
            .with(["invalid", P.any], [P.any, "invalid"], () => "invalid" as const)
            .with([undefined, undefined], () => "notSet" as const)
            .with([P.any, "valid"], ["valid", P.any], () => "valid" as const)
            .exhaustive();

      return {
        validationState,
        isDisabled: props.fieldProps.start.isDisabled && props.fieldProps.end.isDisabled,
        isReadOnly,
      } as const;
    })
    .exhaustive();

  return (
    <Box
      {...getRadiusPropsFromConfig(config.radius)}
      display="flex"
      gap={config.internalSpacing}
      paddingX={config.paddingX}
      paddingY={config.paddingY}
      background={config.background.default}
      className={[
        inputRecipe({ validation: validationState }),
        bodyRecipe({
          color: isDisabled ? "disabled" : "primary",
          weight: "default",
          size: config.fontSize,
          ellipsis: false,
        }),
        dateFieldRecipe({ validation: validationState, isCalendarOpen: props.isCalendarOpen }),
        {
          readOnly: isReadOnly,
        },
      ]}
      style={{ ...getReadOnlyBackgroundStyle(config), justifyContent: "space-between" }}
      disabled={isDisabled}
      readOnly={isReadOnly}
    >
      <Box flexGrow={1}>
        {props.type === "single" ? (
          <DateField fieldProps={props.fieldProps} />
        ) : (
          <Columns space={dateFieldConfig.internalPadding} alignY="stretch">
            <DateField fieldProps={props.fieldProps.start} />
            <Column width="content">
              <Box display="flex" height="full" alignItems="center">
                <IconMinus size={dateFieldConfig.rangeSeparatorSize} />
              </Box>
            </Column>
            <DateField fieldProps={props.fieldProps.end} />
          </Columns>
        )}
      </Box>
      {!isReadOnly && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton
            kind="transparent"
            hierarchy="secondary"
            label="Calendar"
            size={16}
            icon={IconCalendar}
            {...props.buttonProps}
            onPress={props.buttonProps.onPress!}
            isDisabled={isDisabled}
          />
        </Box>
      )}
    </Box>
  );
}
