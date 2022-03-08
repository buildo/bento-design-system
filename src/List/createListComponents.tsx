import { Omit } from "../util/Omit";
import { createListItem, ListItemConfig, ListItemProps } from "./createListItem";
import { InternalList } from "./InternalList";

export type ListSize = "medium" | "large";

type Props = {
  size: ListSize;
  items: Omit<ListItemProps, "size">[];
  dividers?: boolean;
};

export type ListConfig = {
  item: ListItemConfig;
};

export function createListComponents(
  config: ListConfig = {
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
  function List({ items, ...props }: Props) {
    return (
      <InternalList {...props}>
        {items.map((liProps) => (
          <ListItem key={liProps.label} {...liProps} size={props.size} />
        ))}
      </InternalList>
    );
  }

  return { List, ListItem };
}

export type { Props as ListProps };
