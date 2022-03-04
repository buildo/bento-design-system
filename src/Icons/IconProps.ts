import { vars } from "../vars.css";

export type IconProps = {
  size: Extract<keyof typeof vars.space, 8 | 16 | 24> | 12;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "informative"
    | "positive"
    | "warning"
    | "negative"
    | "disabled"
    | "inherit";
  className?: string;
};
