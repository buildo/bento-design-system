import { FocusScope, useFocusRing } from "@react-aria/focus";
import { useSliderThumb } from "@react-aria/slider";
import { mergeProps } from "@react-aria/utils";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SliderState } from "@react-stately/slider";
import { FocusableElement } from "@react-types/shared";
import { DOMAttributes, OutputHTMLAttributes, RefObject, useRef } from "react";
import { Box, Column, Columns, Stack } from "..";
import { Label } from "../Typography/Label/Label";
import { SliderConfig } from "./Config";
import { slider, thumbRecipe, trackActive, trackContainer, trackInactive } from "./Slider.css";

type Props = {
  type: "single" | "double";
  disabled?: boolean;
  trackRef: RefObject<HTMLDivElement>;
  state: SliderState;
  groupProps: DOMAttributes<FocusableElement>;
  trackProps: DOMAttributes<FocusableElement>;
  outputProps: OutputHTMLAttributes<HTMLOutputElement>;
  numberFormatter: Intl.NumberFormat;
  hideThumbValue?: boolean;
  autoFocus?: boolean;
};

export function createSlider(config: SliderConfig) {
  return function Slider(props: Props) {
    return (
      <FocusScope autoFocus={props.autoFocus}>
        <Box className={slider} {...props.groupProps}>
          <Columns space={24} alignY="center">
            <Column width="content">
              <Label size="large" color={props.disabled ? "disabled" : "secondary"}>
                {props.numberFormatter.format(props.state.getThumbMinValue(0))}
              </Label>
            </Column>
            <Box
              className={trackContainer}
              height={config.thumbHeight}
              {...props.trackProps}
              ref={props.trackRef}
              color={undefined}
            >
              <Box
                className={trackInactive}
                disabled={props.disabled}
                borderRadius={config.trailRadius}
                style={{
                  height: config.trailHeight,
                  top: (config.thumbHeight - config.trailHeight) / 2,
                }}
              />
              <Box
                className={trackActive}
                color={config.trailColor}
                background="currentColor"
                disabled={props.disabled}
                borderRadius={config.trailRadius}
                style={{
                  height: config.trailHeight,
                  top: (config.thumbHeight - config.trailHeight) / 2,
                  left: props.type === "single" ? 0 : `${props.state.getThumbPercent(0) * 100}%`,
                  width:
                    props.type === "single"
                      ? `${props.state.getThumbPercent(0) * 100}%`
                      : `${
                          (props.state.getThumbPercent(1) - props.state.getThumbPercent(0)) * 100
                        }%`,
                }}
              />
              <Thumb
                index={0}
                state={props.state}
                trackRef={props.trackRef}
                outputProps={props.outputProps}
                disabled={props.disabled}
                showValue={!props.hideThumbValue}
                autoFocus={props.autoFocus}
              />
              {props.type === "double" && (
                <Thumb
                  index={1}
                  state={props.state}
                  trackRef={props.trackRef}
                  outputProps={props.outputProps}
                  disabled={props.disabled}
                  showValue={!props.hideThumbValue}
                />
              )}
            </Box>
            <Column width="content">
              <Label size="large" color={props.disabled ? "disabled" : "secondary"}>
                {props.numberFormatter.format(
                  props.state.getThumbMaxValue(props.type === "single" ? 0 : 1)
                )}
              </Label>
            </Column>
          </Columns>
        </Box>
      </FocusScope>
    );
  };

  type ThumbProps = {
    trackRef: RefObject<HTMLDivElement>;
    state: SliderState;
    index: number;
    outputProps: OutputHTMLAttributes<HTMLOutputElement>;
    disabled?: boolean;
    showValue: boolean;
    autoFocus?: boolean;
  };

  function Thumb(props: ThumbProps) {
    const { state, trackRef, index } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const {
      thumbProps: { style, ...thumbProps },
      inputProps,
    } = useSliderThumb({ index, trackRef, inputRef, isDisabled: props.disabled }, state);
    const { focusProps, isFocusVisible } = useFocusRing({ autoFocus: props.autoFocus });

    const output = (
      <Box as="output" {...props.outputProps} color={undefined}>
        <Label size="large" color={props.disabled ? "disabled" : undefined}>
          {state.getThumbValueLabel(props.index)}
        </Label>
      </Box>
    );

    return (
      <Box
        position="absolute"
        style={{
          transform: "translateX(-50%)",
          left: `${state.getThumbPercent(index) * 100}%`,
        }}
      >
        <Stack space={config.thumbInternalSpacing} align="center">
          <Box
            className={thumbRecipe({
              isFocused: isFocusVisible,
            })}
            {...thumbProps}
            color={undefined}
            disabled={props.disabled}
            borderRadius={config.thumbRadius}
            width={config.thumbWidth}
            height={config.thumbHeight}
            autoFocus={props.autoFocus}
          >
            <VisuallyHidden>
              <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
            </VisuallyHidden>
          </Box>
          {props.showValue ? output : <VisuallyHidden>{output}</VisuallyHidden>}
        </Stack>
      </Box>
    );
  }
}

export type { Props as SliderProps };
