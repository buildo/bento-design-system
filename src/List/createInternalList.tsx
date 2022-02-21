import { Inset, Stack } from "../internal";
import { Children } from "../";
import { ListConfig, ListProps } from "./createList";

type Props = Omit<ListProps, "items" | "size"> & {
  children: Children;
};

export function createInternalList(config: ListConfig) {
  return function List({ dividers, children }: Props) {
    return (
      <Inset spaceY={config.paddingY}>
        <Stack space={0} as="ul" dividers={dividers}>
          {children}
        </Stack>
      </Inset>
    );
  };
}
