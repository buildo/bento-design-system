import { AnchorHTMLAttributes, useRef } from "react";
import { buttonRecipe } from "../Button/Button.css";
import { useLinkComponent } from "../util/link";
import { ButtonConfig, ButtonProps, defaultButtonConfig } from "./createButton";
import { Label } from "..";
import { Box } from "../internal";
import { useLink } from "@react-aria/link";

type Props = {
  href: string;
  label: ButtonProps["label"];
  kind: ButtonProps["kind"];
  hierarchy: ButtonProps["hierarchy"];
  isDisabled?: ButtonProps["isDisabled"];
  size?: ButtonProps["size"];
  active?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">;

export function createButtonLink(config: ButtonConfig = defaultButtonConfig) {
  return function ButtonLink({
    href,
    kind,
    hierarchy,
    size = "medium",
    isDisabled,
    label,
    active = false,
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
        as={LinkComponent}
        href={href}
        className={[buttonRecipe({ kind, hierarchy, size })]}
        disabled={isDisabled}
        display="inline-block"
        paddingX={config.paddingX[size]}
        paddingY={config.paddingY[size]}
        borderRadius={config.radius}
      >
        <Label as="span" size={config.labelSize}>
          {label}
        </Label>
      </Box>
    );
  };
}

export type { Props as ButtonLinkProps };
