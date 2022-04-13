import { AnchorHTMLAttributes, useRef } from "react";
import { useLinkComponent } from "../util/link";
import { LocalizedString } from "..";
import { Box } from "../internal";
import { useLink } from "@react-aria/link";
import * as resetStyles from "../reset.css";
import { linkRecipe } from "./Link.css";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";
import { LinkConfig } from "./Config";

type Props = {
  kind?: "default" | "inverse";
  href: string;
  label: LocalizedString;
  isDisabled?: boolean;
  active?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">;

export function createLink(config: LinkConfig) {
  return function Link({
    href,
    isDisabled,
    label,
    active = false,
    kind = "default",
    ...props
  }: Props) {
    const LinkComponent = useLinkComponent();
    const ref = useRef<HTMLAnchorElement>(null);
    const {
      linkProps: { color: _discard, ...linkProps },
    } = useLink(
      {
        isDisabled,
        // NOTE(gabro): using anything other than 'a' so that we set the correct accessibility props
        elementType: "span",
      },
      ref
    );

    return (
      <Box
        {...linkProps}
        {...props}
        as={LinkComponent.component}
        href={href}
        className={[
          linkRecipe({ kind }),
          extendedHitAreaRecipe({ axis: "y" }),
          resetStyles.element["a"],
        ]}
        disabled={isDisabled}
        display="inline-block"
        textDecoration={config.textDecoration}
      >
        {label}
      </Box>
    );
  };
}

export type { Props as LinkProps };
