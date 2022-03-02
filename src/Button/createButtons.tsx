import { createButtonLink } from "./ButtonLink";
import { ButtonConfig, createButton, defaultButtonConfig } from "./createButton";

export function createButtons(config: ButtonConfig = defaultButtonConfig) {
  const Button = createButton(config);
  const ButtonLink = createButtonLink(config);

  return { Button, ButtonLink };
}
