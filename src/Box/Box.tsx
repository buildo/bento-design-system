import { createBox as createBox } from "@dessert-box/react";
import { ComponentProps, forwardRef } from "react";
import clsx, { ClassValue } from "clsx";
import { baseSprinkles } from "../sprinkles.css";

declare type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  "as" | "color" | "height" | "width"
>;

export function createBentoBox<AtomsFn extends typeof baseSprinkles>(
  sprinkles: AtomsFn
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<
    React.PropsWithoutRef<
      {
        as?: React.ElementType;
        className?: ClassValue;
      } & Parameters<AtomsFn>[0] &
        Omit<HTMLProperties, "className">
    >
  > &
    React.RefAttributes<HTMLElement>
> {
  const SprinklesBox = createBox({ atoms: sprinkles });

  type Props = Omit<ComponentProps<typeof SprinklesBox>, "className"> & {
    className: ClassValue;
  };

  return forwardRef<HTMLElement, Props>(({ className, ...props }, ref) => {
    return <SprinklesBox ref={ref} {...props} className={clsx(className)} />;
  });
}

export const Box = createBentoBox(baseSprinkles);
