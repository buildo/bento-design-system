import { DisclosureProps, Box, Stack, Disclosure } from "..";
import { useBentoConfig } from "../BentoConfigProvider";
import { Omit } from "../util/Omit";

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

export function DisclosureGroup({ items, iconPosition: iconPosition_, dividers = true }: Props) {
  const config = useBentoConfig().disclosureGroup;
  const iconPosition = iconPosition_ ?? config.defaultIconPosition;
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
}
