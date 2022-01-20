import * as resetStyles from "../reset.css";
import { createBox } from "@dessert-box/react";
import { forwardRef } from "react";
import clsx, { ClassValue } from "clsx";
import { bentoSprinkles } from "../internal/sprinkles.css";

export type BoxProps<AtomsFn extends typeof bentoSprinkles> = {
  as?: React.ElementType;
  className?: ClassValue;
} & HTMLProperties &
  Parameters<AtomsFn>[0];

type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  "as" | "color" | "height" | "width" | "className"
>;

export type BoxType<AtomsFn extends typeof bentoSprinkles> = React.ForwardRefExoticComponent<
  BoxProps<AtomsFn> & React.RefAttributes<HTMLElement>
>;

export function createBentoBox<AtomsFn extends typeof bentoSprinkles>(
  sprinkles: AtomsFn
): BoxType<AtomsFn> {
  const SprinklesBox = createBox({ atoms: sprinkles });

  return forwardRef<HTMLElement, BoxProps<AtomsFn>>(({ className, children, ...props }, ref) => {
    const el = typeof props.as === "string" ? props.as : "div";
    const elementReset = resetStyles.element[el as keyof typeof resetStyles.element];

    return (
      <SprinklesBox
        ref={ref}
        {...(props as any)}
        className={clsx(resetStyles.base, elementReset, className)}
      >
        {children}
      </SprinklesBox>
    );
  }) as any;
}
