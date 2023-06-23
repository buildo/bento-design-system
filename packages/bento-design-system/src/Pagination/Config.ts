import { ButtonProps, PaginationItemsPerPage } from "..";
import { BentoSprinkles } from "../internal";

export type PaginationConfig = {
  paddingY: BentoSprinkles["paddingY"];
  itemsPerPageOptions: Array<PaginationItemsPerPage>;
  dropdownButtonKind: ButtonProps["kind"];
  navigationButtonKind: ButtonProps["kind"];
  navigationButtonSpacing: BentoSprinkles["gap"];
  showDivider: boolean; //true
};
