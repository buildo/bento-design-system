import { Omit } from "../util/Omit";
import { ListConfig } from "./Config";
import { createListItem, ListItemProps } from "./createListItem";
import { InternalList } from "./InternalList";

export type ListSize = "medium" | "large";
type Props = {
  size: ListSize;
  items: Omit<ListItemProps, "size">[];
  dividers?: boolean;
};

export function createListComponents(config: ListConfig) {
  const ListItem = createListItem(config.item);
  function List({ items, ...props }: Props) {
    return (
      <InternalList {...props}>
        {items.map((liProps, i) => (
          <ListItem key={liProps.key ?? i} {...liProps} size={props.size} />
        ))}
      </InternalList>
    );
  }

  return { List, ListItem };
}

export type { Props as ListProps };
