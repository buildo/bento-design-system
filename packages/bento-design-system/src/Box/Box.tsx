import { extractAtomsFromProps } from "@dessert-box/core";
import * as resetStyles from "../reset.css";
import { forwardRef, createElement } from "react";
import clsx, { ClassValue } from "clsx";
import { useSprinkles } from "../SprinklesContext";
import { BentoSprinkles } from "../internal";

export type BoxProps = {
  as?: React.ElementType;
  className?: ClassValue;
} & HTMLProperties &
  BentoSprinkles;

type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  "as" | "color" | "height" | "width" | "className"
>;

export type BoxType = React.ForwardRefExoticComponent<BoxProps & React.RefAttributes<HTMLElement>>;

export const Box = forwardRef<HTMLElement, BoxProps>(
  ({ as: element, className, style, ...props }: BoxProps, ref) => {
    const sprinkles = useSprinkles();
    const { atomProps, customProps, otherProps } = extractAtomsFromProps(props, sprinkles);

    const el = typeof element === "string" ? element : "div";
    const elementReset = resetStyles.element[el as keyof typeof resetStyles.element];

    return createElement(el, {
      ref,
      style: { ...style, ...customProps },
      ...otherProps,
      className: clsx(resetStyles.base, elementReset, className, sprinkles(atomProps)),
    });
  }
);

Box.displayName = "BentoBox";
