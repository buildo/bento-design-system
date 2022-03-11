import { AnchorHTMLAttributes, useRef } from "react";
import { useLinkComponent } from "../util/link";
import { Label, LabelProps, LocalizedString } from "..";
import { BentoSprinkles, Box } from "../internal";
import { useLink } from "@react-aria/link";
import * as resetStyles from "../reset.css";
import { link } from "./Link.css";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";

export type LinkProps = {
  href: string;
  label: LocalizedString;
  isDisabled?: boolean;
  active?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">;

type LinkConfig = {
  labelSize: LabelProps["size"];
  labelDecoration: BentoSprinkles["textDecoration"];
};

export function createLink(
  config: LinkConfig = {
    labelSize: "large",
    labelDecoration: {
      default: "none",
      active: "none",
      hover: "underline",
      focus: "underline",
      disabled: "none",
    },
  }
) {
  return function Link({ href, isDisabled, label, active = false, ...props }: LinkProps) {
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
        color={isDisabled ? "textDisabled" : "textLink"}
      >
        <Label as="span" size={config.labelSize}>
          {label}
        </Label>
      </Box>
    );
  };
}
