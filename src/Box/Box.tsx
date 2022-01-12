import { createBoxWithAtomsProp } from "@dessert-box/react";
import { forwardRef } from "react";
import clsx, { ClassValue } from "clsx";
import { baseSprinkles } from "../sprinkles.css";

type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  "as" | "color" | "height" | "width" | "className"
>;

export function createBentoBox<AtomsFn extends typeof baseSprinkles>(sprinkles: AtomsFn) {
  const SprinklesBox = createBoxWithAtomsProp({ atoms: sprinkles });

  type Props = {
    as?: React.ElementType;
    className?: ClassValue;
    atoms?: Parameters<AtomsFn>[0];
  } & HTMLProperties;

  return forwardRef<HTMLElement, Props>(({ className, children, atoms, ...props }, ref) => {
    return (
      <SprinklesBox ref={ref} {...props} className={clsx(className)} atoms={atoms}>
        {children}
      </SprinklesBox>
    );
  });
}

export const Box = createBentoBox(baseSprinkles);
