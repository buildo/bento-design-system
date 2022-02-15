import { vars } from "../vars.css";

export type IconProps = {
  size: Extract<keyof typeof vars.space, 8 | 16 | 24>;
  color?: "default" | "primary" | "informative" | "positive" | "warning" | "negative" | "disabled";
  className?: string;
};
