import { AnchorHTMLAttributes, useRef } from "react";
import { useLinkComponent } from "../util/link";
import { Children, LocalizedString } from "..";
import { Box } from "../internal";
import { useLink } from "@react-aria/link";
import * as resetStyles from "../reset.css";
import { linkRecipe } from "./Link.css";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";

type Props = {
  isDisabled?: boolean;
  active?: boolean;
  kind?: "default" | "inverse";
  label?: LocalizedString;
  children?: Children;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">;

export function Link({
  href,
  isDisabled,
  label,
  children,
  active = false,
  kind = "default",
  ...props
}: Props) {
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

  return (
    <Box
      {...linkProps}
      {...props}
      as={LinkComponent}
      href={href}
      className={[
        linkRecipe({
          kind: kind,
        }),
        extendedHitAreaRecipe({ axis: "y" }),
        resetStyles.element["a"],
      ]}
      disabled={isDisabled}
      display="inline-block"
    >
      {label ?? children}
    </Box>
  );
}

export type { Props as LinkProps };
