import { HTMLAttributes, Ref, useRef } from "react";
import { Label, Children, Box, Inset } from "..";
import {
  useFloating,
  shift,
  autoPlacement,
  offset,
  arrow,
  UseFloatingOptions,
  flip,
} from "@floating-ui/react-dom";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { useTooltipTrigger, useTooltip } from "@react-aria/tooltip";
import { tooltip, arrow as arrowStyle } from "./Tooltip.css";
import { useCreatePortal } from "../util/useCreatePortal";
import { useBentoConfig } from "../BentoConfigContext";
import { TooltipPlacement } from "../Field/FieldProps";
import { getRadiusPropsFromConfig } from "../util/BorderRadiusConfig";

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
  const floatingProps: UseFloatingOptions = props.placement
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
    floatingStyles,
    refs,
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
      {props.trigger(refs.setReference, triggerProps)}
      {state.isOpen &&
        createPortal(
          <Box
            className={tooltip}
            {...getRadiusPropsFromConfig(config.radius)}
            ref={refs.setFloating}
            style={floatingStyles}
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
