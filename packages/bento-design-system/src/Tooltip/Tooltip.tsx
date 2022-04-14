import { HTMLAttributes, Ref, useRef } from "react";
import { Label, Children } from "..";
import { Box, Inset } from "../internal";
import { useFloating, shift, autoPlacement, offset, arrow } from "@farzadsh/floating-ui-react-dom";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { useTooltipTrigger, useTooltip } from "@react-aria/tooltip";
import { tooltip, arrow as arrowStyle } from "./Tooltip.css";
import { createPortal } from "../util/createPortal";
import { TooltipConfig } from "./Config";

type Props = {
  content: Children;
  /**
   * The trigger element that will be used to open the menu.
   * It must accept a `ref` prop and other accessibility props to ensure the menu is properly
   * connected to its trigger, for accessibility purposes.
   *
   * It can use the `state` parameter to determine and change the menu state.
   */
  trigger: (
    ref: Ref<HTMLElement>,
    props: Omit<HTMLAttributes<HTMLElement>, "color">
  ) => JSX.Element;
};

export function createTooltip(config: TooltipConfig) {
  return function Tooltip(props: Props) {
    const arrowRef = useRef<HTMLElement | null>(null);
    const {
      x,
      y,
      reference,
      floating,
      strategy,
      placement,
      middlewareData: { arrow: arrowData },
    } = useFloating({
      middleware: [shift(), autoPlacement(), offset(8), arrow({ element: arrowRef })],
    });
    const trigger = { delay: 500 };
    const state = useTooltipTriggerState(trigger);
    const ref = useRef<HTMLElement | null>(null);
    const { triggerProps, tooltipProps: _tooltipProps } = useTooltipTrigger(trigger, state, ref);
    const { tooltipProps } = useTooltip(_tooltipProps);

    // See https://floating-ui.com/docs/tutorial#arrow-middleware
    const position: string = placement.split("-")[0];
    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[position]!;

    const arrowPosition = {
      left: Number.isFinite(arrowData?.x) ? arrowData?.x : undefined,
      top: Number.isFinite(arrowData?.y) ? arrowData?.y : undefined,
      [staticSide]: -4,
    };

    return (
      <>
        {props.trigger(reference, triggerProps)}
        {state.isOpen &&
          createPortal(
            <Box
              className={tooltip}
              borderRadius={config.radius}
              ref={floating}
              style={{
                position: strategy,
                top: y ?? "",
                left: x ?? "",
              }}
              {...tooltipProps}
              color={undefined}
            >
              <Inset space={config.padding}>
                <Label size={config.labelSize} color="primaryInverse">
                  {props.content}
                </Label>
              </Inset>
              <Box ref={arrowRef} className={arrowStyle} style={arrowPosition} />
            </Box>
          )}
      </>
    );
  };
}

export type { Props as TooltipProps };
