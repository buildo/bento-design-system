import { ButtonProps, PaginationItemsPerPage } from "..";
import { BentoSprinkles } from "../internal";

export type PaginationConfig = {
  paddingY: BentoSprinkles["paddingY"];
  itemsPerPageOptions: PaginationItemsPerPage;
  dropdownButtonKind: ButtonProps["kind"];
  navigationButtonKind: ButtonProps["kind"];
  navigationButtonSpacing: BentoSprinkles["gap"];
  showDivider: boolean;
};
