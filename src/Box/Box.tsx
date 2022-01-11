import { createBox as createBox } from "@dessert-box/react";
import { ComponentProps, forwardRef } from "react";
import clsx from "clsx";
import { AtomsFnBase } from "@dessert-box/core";
import { baseSprinkles } from "../sprinkles.css";

export function createBentoBox<AtomsFn extends AtomsFnBase>(sprinkles: AtomsFn) {
  const SprinklesBox = createBox({ atoms: sprinkles });

  type Props = ComponentProps<typeof SprinklesBox>;

  return forwardRef<HTMLElement, Props>((props, ref) => (
    <SprinklesBox ref={ref} {...props} className={clsx(props.className)} />
  ));
}

export const Box = createBentoBox(baseSprinkles);
