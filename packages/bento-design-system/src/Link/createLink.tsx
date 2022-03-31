import { AnchorHTMLAttributes, useRef } from "react";
import { useLinkComponent } from "../util/link";
import { Label, LocalizedString } from "..";
import { Box } from "../internal";
import { useLink } from "@react-aria/link";
import * as resetStyles from "../reset.css";
import { link } from "./Link.css";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";
import { LinkConfig } from "./Config";

type Props = {
  href: string;
  label: LocalizedString;
  isDisabled?: boolean;
  active?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">;

export function createLink(config: LinkConfig) {
  return function Link({ href, isDisabled, label, active = false, ...props }: Props) {
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
        as={LinkComponent}
        href={href}
        className={[link, extendedHitAreaRecipe({ axis: "y" }), resetStyles.element["a"]]}
        disabled={isDisabled}
        display="inline-block"
        textDecoration={config.labelDecoration}
      >
        <Label as="span" size={config.labelSize}>
          {label}
        </Label>
      </Box>
    );
  };
}

export type { Props as LinkProps };
