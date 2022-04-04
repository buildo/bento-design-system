import { useFocusRing } from "@react-aria/focus";
import { useNumberFormatter } from "@react-aria/i18n";
import { useSlider, useSliderThumb } from "@react-aria/slider";
import { mergeProps } from "@react-aria/utils";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SliderState, useSliderState } from "@react-stately/slider";
import { AriaLabelingProps, DOMProps } from "@react-types/shared";
import { OutputHTMLAttributes, RefObject, useRef } from "react";
import { Box, Column, Columns, Stack } from "../internal";
import { Label } from "../Typography/Label/Label";
import { unsafeLocalizedString } from "../util/LocalizedString";
import { SliderConfig } from "./Config";
import { slider, thumbRecipe, trackActive, trackContainer, trackInactive } from "./Slider.css";

type Props = {
  minValue: number;
  maxValue: number;
  step?: number;
  disabled?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  fieldProps: AriaLabelingProps & DOMProps;
} & (
  | {
      type: "single";
      value: number;
      onChange: (value: number) => void;
    }
  | {
      type: "double";
      value: [number, number];
      onChange: (value: [number, number]) => void;
    }
);

export function createSlider(config: SliderConfig) {
  return function Slider(props: Props) {
    const trackRef = useRef<HTMLDivElement>(null);
    const numberFormatter = useNumberFormatter(props.formatOptions);
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

    const { groupProps, trackProps, outputProps } = useSlider(
      { ...props, ...valueProps },
      state,
      trackRef
    );

    return (
      <Box className={slider} {...mergeProps(groupProps, props.fieldProps)} color={undefined}>
        <Columns space={24} alignY="center">
          <Column width="content">
            <Label size="large" color={props.disabled ? "disabled" : "secondary"}>
              {unsafeLocalizedString(numberFormatter.format(props.minValue))}
            </Label>
          </Column>
          <Box className={trackContainer} {...trackProps} ref={trackRef} color={undefined}>
            <Box
              className={trackInactive}
              disabled={props.disabled}
              borderRadius={config.trailRadius}
            />
            <Box
              className={trackActive}
              color={config.trailColor}
              background="currentColor"
              disabled={props.disabled}
              borderRadius={config.trailRadius}
              style={{
                left: props.type === "single" ? 0 : `${state.getThumbPercent(0) * 100}%`,
                width:
                  props.type === "single"
                    ? `${state.getThumbPercent(0) * 100}%`
                    : `${(state.getThumbPercent(1) - state.getThumbPercent(0)) * 100}%`,
              }}
            />
            <Thumb
              index={0}
              state={state}
              trackRef={trackRef}
              outputProps={outputProps}
              disabled={props.disabled}
            />
            {props.type === "double" && (
              <Thumb
                index={1}
                state={state}
                trackRef={trackRef}
                outputProps={outputProps}
                disabled={props.disabled}
              />
            )}
          </Box>
          <Column width="content">
            <Label size="large" color={props.disabled ? "disabled" : "secondary"}>
              {unsafeLocalizedString(numberFormatter.format(props.maxValue))}
            </Label>
          </Column>
        </Columns>
      </Box>
    );
  };

  type ThumbProps = {
    trackRef: RefObject<HTMLDivElement>;
    state: SliderState;
    index: number;
    outputProps: OutputHTMLAttributes<HTMLOutputElement>;
    disabled?: boolean;
  };

  function Thumb(props: ThumbProps) {
    const { state, trackRef, index } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const { thumbProps, inputProps } = useSliderThumb(
      { index, trackRef, inputRef, isDisabled: props.disabled },
      state
    );
    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <Box
        position="absolute"
        style={{
          transform: "translateX(-50%)",
          left: `${state.getThumbPercent(index) * 100}%`,
        }}
      >
        <Stack space={8} align="center">
          <Box
            className={thumbRecipe({
              isFocused: isFocusVisible,
            })}
            {...thumbProps}
            color={undefined}
            disabled={props.disabled}
            borderRadius={config.thumbRadius}
          >
            <VisuallyHidden>
              <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
            </VisuallyHidden>
          </Box>
          <Box as="output" {...props.outputProps} color={undefined}>
            <Label size="large" color={props.disabled ? "disabled" : undefined}>
              {unsafeLocalizedString(state.getThumbValueLabel(props.index))}
            </Label>
          </Box>
        </Stack>
      </Box>
    );
  }
}

export type { Props as SliderProps };
