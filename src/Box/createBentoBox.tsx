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
    return (
      <SprinklesBox ref={ref} {...(props as any)} className={clsx(className)}>
        {children}
      </SprinklesBox>
    );
  }) as any;
}
