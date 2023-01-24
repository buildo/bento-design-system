import { ListItem, ListItemProps } from "./ListItem";
import { InternalList } from "./InternalList";
import { BentoSprinkles } from "../internal";

export type ListSize = "medium" | "large";
type Props = {
  size: ListSize;
  items: ListItemProps[];
  space?: BentoSprinkles["gap"];
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
