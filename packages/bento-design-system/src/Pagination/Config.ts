import { ButtonProps, IconButtonProps, PaginationItemsPerPage } from "..";
import { BentoSprinkles } from "../internal";

export type PaginationConfig = {
  paddingY: BentoSprinkles["paddingY"];
  itemsPerPageOptions: PaginationItemsPerPage;
  dropdownButtonKind: ButtonProps["kind"];
  dropdownButtonSize: ButtonProps["size"];
  navigationButtonKind: ButtonProps["kind"];
  navigationButtonSize: IconButtonProps["size"];
  navigationButtonSpacing: BentoSprinkles["gap"];
  showDivider: boolean;
};
