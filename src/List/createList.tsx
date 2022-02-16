import { Omit } from "../util/Omit";
import { BentoSprinkles, Stack, Inset } from "../internal";
import { createListItem, ListItemConfig, ListItemProps } from "./createListItem";

export type ListSize = "medium" | "large";

type Props = {
  size: ListSize;
  items: Omit<ListItemProps, "size">[];
  dividers?: boolean;
};

export type ListConfig = {
  paddingY: BentoSprinkles["paddingY"];
  item: ListItemConfig;
};

export function createList(
  config: ListConfig = {
    paddingY: 8,
    item: {
      paddingX: 16,
      paddingY: {
        medium: 8,
        large: 16,
      },
      fontSize: {
        firstLine: "medium",
        secondLine: "small",
        overline: "small",
      },
      internalSpacing: 16,
      iconSize: {
        leading: 24,
        trailing: 16,
        illustration: 32,
      },
    },
  }
) {
  const ListItem = createListItem(config.item);
  return function List({ size, items, dividers }: Props) {
    return (
      <Inset spaceY={config.paddingY}>
        <Stack space={0} as="ul" dividers={dividers}>
          {items.map((liProps) => (
            <ListItem key={liProps.label} {...liProps} size={size} />
          ))}
        </Stack>
      </Inset>
    );
  };
}
