import { AnchorHTMLAttributes, useRef } from "react";
import { buttonRecipe } from "../Button/Button.css";
import { useLinkComponent } from "../util/link";
import { ButtonProps } from "./Button";
import { Label, Box, Column, Columns } from "..";
import { useLink } from "@react-aria/link";
import { element } from "../reset.css";
import { IconProps } from "../Icons";
import { useBentoConfig } from "../BentoConfigContext";
import { getRadiusPropsFromConfig } from "../util/BorderRadiusConfig";

type Props = {
  href: string;
  label: ButtonProps["label"];
  kind: ButtonProps["kind"];
  hierarchy: ButtonProps["hierarchy"];
  isDisabled?: ButtonProps["isDisabled"];
  size?: ButtonProps["size"];
  active?: boolean;
  icon?: (props: IconProps) => JSX.Element;
  iconPosition?: "leading" | "trailing";
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">;

export function ButtonLink({
  href,
  target,
  kind,
  hierarchy,
  size: size_,
  isDisabled,
  label,
  active = false,
  icon,
  iconPosition,
  ...props
}: Props) {
  const config = useBentoConfig().button;
  const LinkComponent = useLinkComponent();
  const ref = useRef<HTMLAnchorElement>(null);
  const { linkProps } = useLink(
    {
      isDisabled,
      // NOTE(gabro): using anything other than 'a' so that we set the correct accessibility props
      elementType: "span",
    },
    ref
  );

  const size = size_ ?? config.defaultSize;

  return (
    <Box
      {...linkProps}
      {...props}
      as={LinkComponent}
      href={href}
      target={target}
      className={[buttonRecipe({ kind, hierarchy, size, active }), element.a]}
      disabled={isDisabled}
      display="inline-block"
      paddingX={config.paddingX[size]}
      paddingY={config.paddingY[size]}
      {...getRadiusPropsFromConfig(config.radius)}
    >
      <Columns space={config.internalSpacing} alignY="center" reverse={iconPosition === "trailing"}>
        {icon && (
          <Column width="content">
            {icon({
              size: config.iconSize[size],
              color: "inherit",
            })}
          </Column>
        )}
        <Label
          as="span"
          size={typeof config.labelSize === "string" ? config.labelSize : config.labelSize[size]}
          uppercase={config.uppercaseLabel}
        >
          {label}
        </Label>
      </Columns>
    </Box>
  );
}

export type { Props as ButtonLinkProps };
