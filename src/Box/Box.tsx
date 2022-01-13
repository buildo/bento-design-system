import { ClassValue } from "clsx";
import { baseSprinkles } from "../sprinkles.css";
import { createBentoBox } from "./createBentoBox";

type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  "as" | "color" | "height" | "width" | "className"
>;

export type BoxProps<AtomsFn extends typeof baseSprinkles> = {
  as?: React.ElementType;
  className?: ClassValue;
  atoms?: Parameters<AtomsFn>[0];
} & HTMLProperties;

export const Box = createBentoBox(baseSprinkles);

export type BoxType<AtomsFn extends typeof baseSprinkles> = React.ForwardRefExoticComponent<
  BoxProps<AtomsFn> & React.RefAttributes<HTMLElement>
>;
