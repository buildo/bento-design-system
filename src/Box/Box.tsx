import { createBox as createBox } from "@dessert-box/react";
import { forwardRef } from "react";
import clsx, { ClassValue } from "clsx";
import { baseSprinkles } from "../sprinkles.css";
import { Children } from "../util/Children";

declare type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  "as" | "color" | "height" | "width"
>;

export function createBentoBox<AtomsFn extends typeof baseSprinkles>(
  sprinkles: AtomsFn
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<
    {
      as?: React.ElementType<any>;
      children?: Children;
      className?: ClassValue;
    } & Parameters<AtomsFn>[0] &
      HTMLProperties
  > &
    React.RefAttributes<HTMLElement>
> {
  const SprinklesBox = createBox({ atoms: sprinkles });

  type Props = {
    as?: React.ElementType<any>;
    children?: Children;
    className?: ClassValue;
  } & Parameters<AtomsFn>[0] &
    HTMLProperties;

  return forwardRef<HTMLElement, Props>(({ className, ...props }: Props, ref) => {
    return <SprinklesBox ref={ref} {...(props as any)} className={clsx(className)} />;
  });
}

export const Box = createBentoBox(baseSprinkles);
