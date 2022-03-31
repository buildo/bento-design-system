import { createButtonLink } from "./ButtonLink";
import { ButtonConfig } from "./Config";
import { createButton, ButtonProps } from "./createButton";

export function createButtons(config: ButtonConfig) {
  const Button = createButton(config);
  const ButtonLink = createButtonLink(config);

  return { Button, ButtonLink };
}

export type { ButtonProps };
