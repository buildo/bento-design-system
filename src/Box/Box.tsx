import { createBox as _createBox } from "@dessert-box/react";
import { ComponentProps, forwardRef } from "react";
import clsx, { ClassValue } from "clsx";
import { AtomsFnBase } from "@dessert-box/core";

export function createBox<AtomsFn extends AtomsFnBase>(sprinkles: AtomsFn) {
  const SprinklesBox = _createBox({ atoms: sprinkles });

  type Props = Omit<ComponentProps<typeof SprinklesBox>, "className"> & {
    className?: ClassValue;
  };

  return forwardRef<HTMLElement, Props>((props, ref) => (
    <SprinklesBox ref={ref} {...(props as any)} className={clsx(props.className)} />
  ));
}
