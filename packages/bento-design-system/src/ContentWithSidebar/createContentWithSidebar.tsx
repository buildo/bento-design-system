import { BoxProps, BoxType } from "../Box/createBentoBox";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { Children } from "../util/Children";

export function createContentWithSidebar<AtomsFn extends typeof bentoSprinkles>(
  Box: BoxType<AtomsFn>
) {
  type Props = {
    space: BoxProps<AtomsFn>["gap"];
    children: [Children, Children];
    sidebar: {
      background?: BoxProps<AtomsFn>["background"];
      width: string | number;
      as?: BoxProps<AtomsFn>["as"];
    };
    content?: {
      as?: BoxProps<AtomsFn>["as"];
    };
  };

  return function ContentWithSidebar({ space, children, content, sidebar }: Props) {
    return (
      <Box display="flex" height="full" gap={space}>
        <Box as={content?.as ?? "main"} flex={1}>
          {children[0]}
        </Box>
        <Box
          as={content?.as ?? "aside"}
          background={sidebar.background}
          style={{ width: sidebar.width }}
        >
          {children[1]}
        </Box>
      </Box>
    );
  };
}
