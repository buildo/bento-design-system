import { HTMLAttributes, Ref, useRef } from "react";
import { Label, Children, Box, Inset } from "..";
import {
  useFloating,
  shift,
  autoPlacement,
  offset,
  arrow,
  Placement,
  UseFloatingProps,
} from "@floating-ui/react-dom";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { useTooltipTrigger, useTooltip } from "@react-aria/tooltip";
import { tooltip, arrow as arrowStyle } from "./Tooltip.css";
import { createPortal } from "../util/createPortal";
import { useBentoConfig } from "../BentoConfigContext";

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
  placement?: Placement;
};

export function Tooltip(props: Props) {
  const config = useBentoConfig().tooltip;
  const arrowRef = useRef<HTMLElement | null>(null);

  const floatingProps: UseFloatingProps = props.placement
    ? {
        placement: props.placement,
        middleware: [shift(), offset(8), arrow({ element: arrowRef })],
      }
    : {
        middleware: [shift(), autoPlacement(), offset(8), arrow({ element: arrowRef })],
      };
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    placement,
    middlewareData: { arrow: arrowData },
  } = useFloating(floatingProps);

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
          >
            <Inset spaceX={config.paddingX} spaceY={config.paddingY}>
              <Label size={config.labelSize} color="primaryInverse">
                {props.content}
              </Label>
            </Inset>
            <Box ref={arrowRef} className={arrowStyle} style={arrowPosition} />
          </Box>
        )}
    </>
  );
}

export type { Props as TooltipProps };
