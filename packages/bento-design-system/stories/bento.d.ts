import { StrictLocalizedString } from "../src";
import { sprinkles } from "./sprinkles.css";

declare module "@buildo/bento-design-system" {
  interface TypeOverrides {
    LocalizedString: StrictLocalizedString;
    SprinklesFn: typeof sprinkles;
    ChipCustomColors: "custom";
    PaginationItemsPerPage: [5, 10, 20, 50];
  }
}
