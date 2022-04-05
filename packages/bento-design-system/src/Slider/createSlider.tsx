import { useFocusRing } from "@react-aria/focus";
import { useSliderThumb } from "@react-aria/slider";
import { mergeProps } from "@react-aria/utils";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SliderState } from "@react-stately/slider";
import { OutputHTMLAttributes, RefObject, useRef } from "react";
import { Box, Column, Columns, Stack } from "../internal";
import { Label } from "../Typography/Label/Label";
import { unsafeLocalizedString } from "../util/LocalizedString";
import { SliderConfig } from "./Config";
import { slider, thumbRecipe, trackActive, trackContainer, trackInactive } from "./Slider.css";

type Props = {
  type: "single" | "double";
  disabled?: boolean;
  trackRef: RefObject<HTMLDivElement>;
  state: SliderState;
  groupProps: React.HTMLAttributes<HTMLElement>;
  trackProps: React.HTMLAttributes<HTMLElement>;
  outputProps: OutputHTMLAttributes<HTMLOutputElement>;
  numberFormatter: Intl.NumberFormat;
};

export function createSlider(config: SliderConfig) {
  return function Slider(props: Props) {
    return (
      <Box className={slider} {...props.groupProps} color={undefined}>
        <Columns space={24} alignY="center">
          <Column width="content">
            <Label size="large" color={props.disabled ? "disabled" : "secondary"}>
              {unsafeLocalizedString(props.numberFormatter.format(props.state.getThumbMinValue(0)))}
            </Label>
          </Column>
          <Box
            className={trackContainer}
            {...props.trackProps}
            ref={props.trackRef}
            color={undefined}
          >
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
                left: props.type === "single" ? 0 : `${props.state.getThumbPercent(0) * 100}%`,
                width:
                  props.type === "single"
                    ? `${props.state.getThumbPercent(0) * 100}%`
                    : `${(props.state.getThumbPercent(1) - props.state.getThumbPercent(0)) * 100}%`,
              }}
            />
            <Thumb
              index={0}
              state={props.state}
              trackRef={props.trackRef}
              outputProps={props.outputProps}
              disabled={props.disabled}
            />
            {props.type === "double" && (
              <Thumb
                index={1}
                state={props.state}
                trackRef={props.trackRef}
                outputProps={props.outputProps}
                disabled={props.disabled}
              />
            )}
          </Box>
          <Column width="content">
            <Label size="large" color={props.disabled ? "disabled" : "secondary"}>
              {unsafeLocalizedString(
                props.numberFormatter.format(
                  props.state.getThumbMaxValue(props.type === "single" ? 0 : 1)
                )
              )}
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
