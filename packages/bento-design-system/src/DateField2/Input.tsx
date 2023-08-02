import { DateValue, createCalendar } from "@internationalized/date";
import { AriaDatePickerProps, useDateField, useDateSegment } from "@react-aria/datepicker";
import { useLocale } from "@react-aria/i18n";
import {
  DateFieldState,
  DateSegment as DateSegmentType,
  useDateFieldState,
} from "@react-stately/datepicker";
import { RefObject, useRef } from "react";
import { Box } from "../Box/Box";
import { inputRecipe } from "../Field/Field.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { useBentoConfig } from "../BentoConfigContext";
import { getRadiusPropsFromConfig } from "../util/BorderRadiusConfig";
import { Body } from "../Typography/Body/Body";
import { Inline } from "../Layout/Inline";
import useDimensions from "react-cool-dimensions";
import { IconCalendar } from "../Icons";
import { AriaButtonProps } from "@react-types/button";
import { IconButton } from "../IconButton/IconButton";

type Props = {
  fieldProps: AriaDatePickerProps<DateValue>;
  buttonProps: AriaButtonProps<"button">;
  ref: RefObject<HTMLInputElement>;
};

function DateSegment({ segment, state }: { segment: DateSegmentType; state: DateFieldState }) {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);
  const config = useBentoConfig().input;

  return (
    <Box {...segmentProps} ref={ref}>
      <Body size={config.fontSize}>{segment.text}</Body>
    </Box>
  );
}

export function Input({ fieldProps, buttonProps, ref }: Props) {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...fieldProps,
    locale,
    createCalendar,
  });
  const { fieldProps: dateFieldProps } = useDateField(fieldProps, state, ref);
  const config = useBentoConfig().input;

  const { observe: rightAccessoryRef, width: rightAccessoryWidth } = useDimensions({
    // This is needed to include the padding in the width
    useBorderBoxSize: true,
  });

  return (
    <Box
      {...dateFieldProps}
      ref={ref}
      {...getRadiusPropsFromConfig(config.radius)}
      paddingX={config.paddingX}
      paddingY={config.paddingY}
      background={config.background.default}
      className={[
        inputRecipe({ validation: fieldProps.validationState ?? "notSet" }),
        bodyRecipe({
          color: fieldProps.isDisabled ? "disabled" : "primary",
          weight: "default",
          size: config.fontSize,
          ellipsis: false,
        }),
      ]}
      style={{ paddingRight: rightAccessoryWidth }}
      position="relative"
    >
      <Inline space={0}>
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </Inline>
      <Box
        ref={rightAccessoryRef}
        position="absolute"
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingX={config.paddingX}
        top={0}
        bottom={0}
        right={0}
      >
        <IconButton
          kind="transparent"
          hierarchy="secondary"
          label="Calendar"
          size={16}
          icon={IconCalendar}
          {...buttonProps}
          onPress={buttonProps.onPress!}
        />
      </Box>
    </Box>
  );
}
