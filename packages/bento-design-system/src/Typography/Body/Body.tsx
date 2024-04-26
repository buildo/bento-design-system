import { AsProp, Box } from "../../";
import { TypographyProps } from "../TypographyProps";
import { bodyRecipe } from "./Body.css";

type Props = TypographyProps & {
  id?: string;
  weight?: "default" | "strong";
} & AsProp;

export function Body({
  children,
  size,
  weight = "default",
  color = "primary",
  align,
  ellipsis = false,
  as = "span",
}: Props) {
  return (
    <Box as={as} className={bodyRecipe({ weight, size, color, ellipsis })} textAlign={align}>
      {children}
    </Box>
  );
}

export type { Props as BodyProps };
