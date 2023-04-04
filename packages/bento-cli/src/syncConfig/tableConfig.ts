import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function tableConfig(
  ctx: Ctx
): Omit<
  SimpleBentoConfig["table"],
  "cellTooltipPlacement" | "emptyIllustration" | "headerInfoIcon" | "hintPlacement"
> {
  const { components: rowComponents, findWithVariants: findRowWithVariants } =
    ctx.findComponentsInPage("Table", "Row");
  const evenRow = findRowWithVariants({ Type: "Even" });
  const evenRowBackground = findChildByName(evenRow, "Background", "RECTANGLE");
  const headerRow = rowComponents.find((c) => c.name === "Header")!;
  const headerRowBackground = findChildByName(headerRow, "Background", "RECTANGLE");
  const sectionRow = rowComponents.find((c) => c.name === "Section")!;

  const { components: cellComponents, findWithVariants: findCellWithVariants } =
    ctx.findComponentsInPage("Table", "Cell");
  const headerCell = findCellWithVariants({
    Kind: "Not sorted",
    "Tooltip info": "False",
    "Modal info": "False",
  });
  const headerText = findChildByName(headerCell, "Header", "TEXT");
  //const buttonCell = cellComponents.find((c) => c.name === "Button")!;  // TODO: the Button cell is currently not a component in Figma
  const linkCell = cellComponents.find((c) => c.name === "Link")!;
  const chipCell = cellComponents.find((c) => c.name === "Tag")!;
  const textCell = cellComponents.find((c) => c.name === "Text")!;
  const iconButtonCell = cellComponents.find((c) => c.name === "Icon")!;
  const labelCell = cellComponents.find((c) => c.name === "Label")!;
  const textWithIconCell = cellComponents.find((c) => c.name === "Text + Icon")!;

  return {
    evenRowsBackgroundColor: ctx.colorVariant(evenRowBackground),
    boundaryPadding: 8, // TODO: how to get this?
    headerBackgroundColor: ctx.colorVariant(headerRowBackground),
    headerForegroundColor: ctx.colorVariant(headerText),
    padding: {
      header: { paddingX: headerCell.paddingLeft, paddingY: headerCell.paddingTop },
      buttonCell: { paddingX: 0, paddingY: 0 }, // TODO: fix when buttonCell is fixed
      buttonLinkCell: { paddingX: 0, paddingY: 0 }, // TODO: fix when buttonCell is fixed
      chipCell: { paddingX: chipCell.paddingLeft, paddingY: chipCell.paddingTop },
      defaultCell: { paddingX: textCell.paddingLeft, paddingY: textCell.paddingTop },
      iconButtonCell: { paddingX: iconButtonCell.paddingLeft, paddingY: iconButtonCell.paddingTop },
      iconCell: { paddingX: iconButtonCell.paddingLeft, paddingY: iconButtonCell.paddingTop },
      labelCell: { paddingX: labelCell.paddingLeft, paddingY: labelCell.paddingTop },
      linkCell: { paddingX: linkCell.paddingLeft, paddingY: linkCell.paddingTop },
      textCell: { paddingX: textCell.paddingLeft, paddingY: textCell.paddingTop },
      textWithIconCell: {
        paddingX: textWithIconCell.paddingLeft,
        paddingY: textWithIconCell.paddingTop,
      },
    },
    selectedRowBackgroundColor: ctx.colorVariant(sectionRow),
  };
}
