import { createButtonLink } from "./ButtonLink";
import { ButtonConfig, createButton, defaultButtonConfig, ButtonProps } from "./createButton";

export function createButtons(config: ButtonConfig = defaultButtonConfig) {
  const Button = createButton(config);
  const ButtonLink = createButtonLink(config);

  return { Button, ButtonLink };
}

export type { ButtonProps };
export { defaultButtonConfig };
