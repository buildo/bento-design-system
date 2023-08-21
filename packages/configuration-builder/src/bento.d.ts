import { StrictLocalizedString } from "@buildo/bento-design-system";

declare module "@buildo/bento-design-system" {
  interface TypeOverrides {
    LocalizedString: StrictLocalizedString;
  }
}
