import { extractAtomsFromProps } from "@dessert-box/core";
import * as resetStyles from "../reset.css";
import { forwardRef, createElement } from "react";
import clsx, { ClassValue } from "clsx";
import { bentoSprinkles } from "../internal/sprinkles.css";

export type BoxProps = {
  as?: React.ElementType;
  className?: ClassValue;
} & HTMLProperties &
  Parameters<SprinklesFn>[0];

type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  "as" | "color" | "height" | "width" | "className"
>;

export type BoxType = React.ForwardRefExoticComponent<
  BoxProps & React.RefAttributes<HTMLElement>
>;

export const Box = forwardRef<HTMLElement, BoxProps>(
  ({ as: element, className, style, ...props }: BoxProps, ref) => {
    // TODO(gabro): support custom sprinkles via context here
    const { atomProps, customProps, otherProps } = extractAtomsFromProps(props, bentoSprinkles);

    const el = typeof element === "string" ? element : "div";
    const elementReset = resetStyles.element[el as keyof typeof resetStyles.element];

    return createElement(el, {
      ref,
      style: { ...style, ...customProps },
      ...otherProps,
      className: clsx(resetStyles.base, elementReset, className, bentoSprinkles(atomProps)),
    });
  }
);

Box.displayName = "BentoBox";
