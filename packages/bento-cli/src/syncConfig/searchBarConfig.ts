import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function searchBarConfig(
  ctx: Ctx
): Omit<
  SimpleBentoConfig["searchBar"],
  "clearIcon" | "passwordHideIcon" | "passwordShowIcon" | "passwordIconSize" | "searchIcon"
> {
  const { findWithVariants } = ctx.findComponentsInPage("Search Bar");

  const SearchBar = findWithVariants({ State: "Enabled Value" });
  const clearIcon = findChildByName(SearchBar, "Icon Button", "INSTANCE");
  const searchIcon = findChildByName(SearchBar, "Search", "INSTANCE");
  const value = findChildByName(SearchBar, "Placeholder", "TEXT");

  return {
    background: {
      default: ctx.colorVariant(SearchBar),
      readOnly: ctx.colorVariant(SearchBar), // TODO: background for read-only state
    },
    clearIconSize: clearIcon.absoluteBoundingBox.width,
    fontSize: ctx.typographyVariant(value).size,
    internalSpacing: SearchBar.itemSpacing,
    paddingX: SearchBar.paddingLeft,
    paddingY: SearchBar.paddingTop,
    radius: SearchBar.cornerRadius,
    searchIconSize: searchIcon.absoluteBoundingBox.width,
  };
}
