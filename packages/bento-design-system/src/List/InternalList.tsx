import { Stack, Children } from "..";
import { ListProps } from "./List";

type Props = Omit<ListProps, "items" | "size"> & {
  children: Children;
};

export function InternalList({ dividers, children }: Props) {
  return (
    <Stack space={0} as="ul" dividers={dividers}>
      {children}
    </Stack>
  );
}
