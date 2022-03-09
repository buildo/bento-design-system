import { useBreadcrumbItem, useBreadcrumbs } from "@react-aria/breadcrumbs";
import { useRef, Fragment, FunctionComponent } from "react";
import { IconProps } from "../Icons/IconProps";
import { IconChevronRight, Body, LinkProps, LocalizedString } from "../";
import { Box, Inline, BentoSprinkles } from "../internal";

type LastItem = {
  label: LocalizedString;
};

type Item = LastItem & {
  href: string;
};

export type BreadcrumbProps = {
  items: [...Item[], LastItem];
};

type BreadcrumbItemProps = LastItem & Partial<Item> & { isCurrent: boolean };

type BreadcrumbConfig = {
  separator: FunctionComponent<IconProps>;
  separatorSize: IconProps["size"];
  space: BentoSprinkles["gap"];
};

export function createBreadcrumb(
  Link: FunctionComponent<LinkProps>,
  config: BreadcrumbConfig = {
    separator: IconChevronRight,
    separatorSize: 8,
    space: 16,
  }
) {
  const BreadcrumbItem = createBreadcrumbItem(Link);
  const Separator = config.separator;
  return function Breadcrumb(props: BreadcrumbProps) {
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
                    <Separator size={config.separatorSize} />
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
      <Box as="nav" {...navProps} color={undefined}>
        {children}
      </Box>
    );
  };
}

function createBreadcrumbItem(Link: FunctionComponent<LinkProps>) {
  return function BreadcrumbItem({ isCurrent, label, href = "" }: BreadcrumbItemProps) {
    const ref = useRef(null);
    const {
      itemProps: { color, ...itemProps },
    } = useBreadcrumbItem({ children: label, isCurrent, elementType: "div" }, ref);

    return (
      <Box as="li" ref={ref}>
        {isCurrent ? (
          <Body size="medium" {...itemProps}>
            {label}
          </Body>
        ) : (
          <Link
            label={label}
            href={href}
            title={label}
            // NOTE(gabro): we need the cast due to a minor inconsistency in the callback type of FocusEventHandler
            {...itemProps}
          />
        )}
      </Box>
    );
  };
}
