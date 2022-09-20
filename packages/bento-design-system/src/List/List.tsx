import { ListItem, ListItemProps } from "./ListItem";
import { InternalList } from "./InternalList";

export type ListSize = "medium" | "large";
type Props = {
  size: ListSize;
  items: ListItemProps[];
  dividers?: boolean;
};

export function List({ items, ...props }: Props) {
  return (
    <InternalList {...props}>
      {items.map((liProps, i) => (
        <ListItem key={liProps.key ?? i} {...liProps} size={props.size} />
      ))}
    </InternalList>
  );
}

export type { Props as ListProps };
