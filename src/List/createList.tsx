import { Omit } from "../util/Omit";
import { BentoSprinkles } from "../internal";
import { createListItem, ListItemConfig, ListItemProps } from "./createListItem";
import { createInternalList } from "./createInternalList";

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
  const InternalList = createInternalList(config);
  const ListItem = createListItem(config.item);
  return function List({ items, ...props }: Props) {
    return (
      <InternalList {...props}>
        {items.map((liProps) => (
          <ListItem key={liProps.label} {...liProps} size={props.size} />
        ))}
      </InternalList>
    );
  };
}

export type { Props as ListProps };
