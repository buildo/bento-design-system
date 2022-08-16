import { RequiredResponsiveValue } from "../internal/sprinkles.css";
import { Children, Box } from "..";
import { contentBlockRecipe } from "./ContentBlock.css";

type Props = {
  maxWidth: RequiredResponsiveValue<700 | 1440>;
  alignSelf?: "center" | "left";
  children: Children;
};

export function ContentBlock({ maxWidth, alignSelf = "left", children }: Props) {
  return (
    <Box className={contentBlockRecipe({ alignSelf })} width="full" maxWidth={maxWidth}>
      {children}
    </Box>
  );
}

export type { Props as ContentBlockProps };
