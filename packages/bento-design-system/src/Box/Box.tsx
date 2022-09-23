import { extractAtomsFromProps } from "@dessert-box/core";
import * as resetStyles from "../reset.css";
import { forwardRef, createElement } from "react";
import clsx, { ClassValue } from "clsx";
import { useSprinkles } from "../SprinklesContext";
import { SprinklesFn } from "../util/ConfigurableTypes";

type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  "as" | "color" | "height" | "width" | "className"
>;

type AsProp = {
  as?: React.ElementType;
};

type Props = Parameters<SprinklesFn>[0] &
  HTMLProperties &
  AsProp & {
    className?: ClassValue;
  };

export type { AsProp, Props as BoxProps };

export type BoxType = React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLElement>>;

// NOTE(gabro): it's important that we annotate Box here, because otherwise tsc will inline Props
// in the .d.ts output, making it impossible to override the SprinklesFn type (see ConfigurableTypes.ts).
// Adding an explicit type annotation here, makes it so the type isn't inlined and it still directly references
// SprinklesFn.
//
// Another caveat is that BoxType must be exported, otherwise tsc will inline it anyway to avoid
// referencing an internal type.
export const Box: BoxType = forwardRef<HTMLElement, Props>(
  ({ as: element, className, style, ...props }: Props, ref) => {
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
