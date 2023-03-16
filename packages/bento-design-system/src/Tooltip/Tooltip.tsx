import { HTMLAttributes, Ref, useRef } from "react";
import { Label, Children, Box, Inset } from "..";
import {
  useFloating,
  shift,
  autoPlacement,
  offset,
  arrow,
  UseFloatingProps,
  flip,
} from "@floating-ui/react-dom";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { useTooltipTrigger, useTooltip } from "@react-aria/tooltip";
import { tooltip, arrow as arrowStyle } from "./Tooltip.css";
import { useCreatePortal } from "../util/useCreatePortal";
import { useBentoConfig } from "../BentoConfigContext";
import { TooltipPlacement } from "../Field/FieldProps";

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
  placement?: TooltipPlacement;
};

export function Tooltip(props: Props) {
  const config = useBentoConfig().tooltip;
  const arrowRef = useRef<HTMLElement | null>(null);
  const createPortal = useCreatePortal();

  const commonMiddleware = [shift(), offset(8)];
  const arrowMiddleware = arrow({ element: arrowRef });
  const floatingProps: UseFloatingProps = props.placement
    ? {
        placement: props.placement,
        middleware: commonMiddleware.concat([flip(), arrowMiddleware]),
      }
    : {
        // NOTE(gabro): it's important that arrow comes after autoPlacement, otherwise the arrow will be positioned incorrectly
        // See https://github.com/buildo/bento-design-system/issues/513
        middleware: commonMiddleware.concat([autoPlacement(), arrowMiddleware]),
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
