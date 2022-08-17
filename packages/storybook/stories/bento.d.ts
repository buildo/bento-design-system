import "@buildo/bento-design-system";
import { sprinkles } from "./sprinkles.css";

declare module "@buildo/bento-design-system" {
  interface TypeOverrides {
    LocalizedString: StrictLocalizedString;
    SprinklesFn: typeof sprinkles;
    ChipCustomColors: "custom";
  }
}
