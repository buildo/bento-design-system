import { FunctionComponent } from "react";
import { DisclosureProps, Box, Stack } from "..";
import { Omit } from "../util/Omit";
import { DisclosureGroupConfig } from "./Config";

type LeafItem = Omit<DisclosureProps, "level" | "iconPosition">;
type NodeItem = Omit<LeafItem, "children"> & { items: Array<LeafItem> };
type Props = {
  iconPosition?: DisclosureProps["iconPosition"];
  items: Array<NodeItem | LeafItem>;
  dividers?: boolean;
};

function isLeaf(item: NodeItem | LeafItem): item is LeafItem {
  return !("items" in item);
}

export type { Props as DisclosureGroupProps };

export function createDisclosureGroup(
  config: DisclosureGroupConfig,
  {
    Disclosure,
  }: {
    Disclosure: FunctionComponent<DisclosureProps>;
  }
) {
  return function DisclosureGroup({
    items,
    iconPosition = config.defaultIconPosition,
    dividers = true,
  }: Props) {
    const hasNestedItems = items.some((i) => !isLeaf(i));
    return (
      <Stack
        space={hasNestedItems ? config.groupSpacing : config.disclosureSpacing}
        dividers={dividers}
      >
        {items.map((item, index) => {
          if (isLeaf(item)) {
            return <Disclosure key={index} {...item} level={1} iconPosition={iconPosition} />;
          }
          return (
            <Disclosure key={index} {...item} level={1} iconPosition={iconPosition}>
              <Box paddingLeft={16}>
                <Stack space={config.disclosureSpacing}>
                  {item.items.map((item, index) => (
                    <Disclosure key={index} {...item} level={2} iconPosition={iconPosition} />
                  ))}
                </Stack>
              </Box>
            </Disclosure>
          );
        })}
      </Stack>
    );
  };
}
