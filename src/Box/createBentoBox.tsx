import { createBoxWithAtomsProp } from "@dessert-box/react";
import { forwardRef } from "react";
import clsx from "clsx";
import { baseSprinkles } from "../sprinkles.css";
import { BoxProps } from "./Box";

export function createBentoBox<AtomsFn extends typeof baseSprinkles>(sprinkles: AtomsFn) {
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
