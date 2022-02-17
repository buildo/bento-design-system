import { vars } from "../vars.css";

export type IconProps = {
  size: Extract<keyof typeof vars.space, 8 | 12 | 16 | 24>;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "informative"
    | "positive"
    | "warning"
    | "negative"
    | "disabled";
  className?: string;
};
