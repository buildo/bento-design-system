import { createBox } from "@dessert-box/react";
import { ComponentProps, forwardRef } from "react";
import { sprinkles } from "../sprinkles.css";
import clsx, { ClassValue } from "clsx";

const SprinklesBox = createBox({ atoms: sprinkles });

type Props = Omit<ComponentProps<typeof SprinklesBox>, "className"> & {
  className?: ClassValue;
};

export const Box = forwardRef<HTMLElement, Props>((props, ref) => (
  <SprinklesBox ref={ref} {...props} className={clsx(props.className)} />
));
