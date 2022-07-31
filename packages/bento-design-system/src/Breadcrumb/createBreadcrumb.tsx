import { useBreadcrumbItem, useBreadcrumbs } from "@react-aria/breadcrumbs";
import { useRef, Fragment } from "react";
import { Body, Link, LocalizedString } from "../";
import { Box, Inline } from "../internal";
import { BreadcrumbConfig } from "./Config";

type LastItem = {
  label: LocalizedString;
};
type Item = LastItem & {
  href: string;
};
type Props = {
  items: [...Item[], LastItem];
};

export function createBreadcrumb(config: BreadcrumbConfig) {
  type BreadcrumbItemProps = LastItem & Partial<Item> & { isCurrent: boolean };
  function BreadcrumbItem({ isCurrent, label, href = "" }: BreadcrumbItemProps) {
    const ref = useRef(null);
    const { itemProps } = useBreadcrumbItem(
      { children: label, isCurrent, elementType: "div" },
      ref
    );

    return (
      <Box as="li" ref={ref}>
        <Body size={config.fontSize} {...itemProps}>
          {isCurrent ? label : <Link href={href} label={label} />}
        </Body>
      </Box>
    );
  }
  return function Breadcrumb(props: Props) {
    const children = (
      <Box as="ol">
        <Inline space={config.space} alignY="center">
          {props.items.map((item, idx) => {
            const isCurrent = idx === props.items.length - 1;
            return (
              <Fragment key={idx}>
                <BreadcrumbItem isCurrent={isCurrent} {...item} />
                {!isCurrent && (
                  <Box as="span" aria-hidden="true">
                    {config.separator({ size: config.separatorSize })}
                  </Box>
                )}
              </Fragment>
            );
          })}
        </Inline>
      </Box>
    );
    const { navProps } = useBreadcrumbs({ children });
    return (
      <Box as="nav" {...navProps}>
        {children}
      </Box>
    );
  };
}

export type { Props as BreadcrumbProps };
