import { Stack, Children } from "..";
import { useBentoConfig } from "../BentoConfigContext";
import type { ListProps } from "./List";

type Props = Omit<ListProps, "items" | "size"> & {
  children: Children;
};

export function InternalList({ dividers, space, children }: Props) {
  const config = useBentoConfig().list;
  return (
    <Stack space={space ?? config.spacing} as="ul" dividers={dividers}>
      {children}
    </Stack>
  );
}
