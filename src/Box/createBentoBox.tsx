import { createBoxWithAtomsProp } from "@dessert-box/react";
import { forwardRef } from "react";
import clsx, { ClassValue } from "clsx";
import { baseSprinkles } from "../sprinkles.css";

export type BoxProps<AtomsFn extends typeof baseSprinkles> = {
  as?: React.ElementType;
  className?: ClassValue;
  atoms?: Parameters<AtomsFn>[0];
} & HTMLProperties;

type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  "as" | "color" | "height" | "width" | "className"
>;

export type BoxType<AtomsFn extends typeof baseSprinkles> = React.ForwardRefExoticComponent<
  BoxProps<AtomsFn> & React.RefAttributes<HTMLElement>
>;

export function createBentoBox<AtomsFn extends typeof baseSprinkles>(
  sprinkles: AtomsFn
): BoxType<AtomsFn> {
  const SprinklesBox = createBoxWithAtomsProp({ atoms: sprinkles });

  return forwardRef<HTMLElement, BoxProps<AtomsFn>>(
    ({ className, children, atoms, ...props }, ref) => {
      return (
        <SprinklesBox ref={ref} {...props} className={clsx(className)} atoms={atoms}>
          {children}
        </SprinklesBox>
      );
    }
  );
}
