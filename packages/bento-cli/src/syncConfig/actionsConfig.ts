import * as Figma from "figma-api";
import { Ctx } from "../util/Ctx.js";
import { findChild } from "./util/findChildByName.js";
import { nameToVariantProperties } from "./util/nameToVariantProperties.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function actionsConfig(
  ctx: Ctx
): Omit<SimpleBentoConfig["actions"], "defaultSize" | "defaultErrorBannerWidth"> {
  const { findWithVariants } = ctx.findComponentsInPage("Actions");

  const actions = findWithVariants({
    Kind: "Double choice",
    Hierarchy: "Primary",
    State: "Enabled",
  });
  const primaryButtonInstance = findChild(
    actions,
    (n) =>
      n.type === "INSTANCE" &&
      n.name === "Button" &&
      nameToVariantProperties(ctx.componentFromInstance(n as Figma.Node<"INSTANCE">).name)[
        "Hierarchy"
      ] === "Primary",
    "INSTANCE"
  );
  const primaryButton = ctx.componentFromInstance(primaryButtonInstance);
  const secondaryButtonInstance = findChild(
    actions,
    (n) =>
      n.type === "INSTANCE" &&
      n.name === "Button" &&
      nameToVariantProperties(ctx.componentFromInstance(n as Figma.Node<"INSTANCE">).name)[
        "Hierarchy"
      ] === "Secondary",
    "INSTANCE"
  );
  const secondaryButton = ctx.componentFromInstance(secondaryButtonInstance);

  const buttonsContainer = actions.children[0] as Figma.Node<"FRAME">;
  const buttons = buttonsContainer.children as [Figma.Node<"INSTANCE">, Figma.Node<"INSTANCE">];
  const primaryPosition =
    nameToVariantProperties(ctx.componentFromInstance(buttons[0]).name)["Hierarchy"] === "Primary"
      ? "left"
      : "right";

  return {
    buttonsAlignment: alignItemsToAlignment(actions.primaryAxisAlignItems),
    spaceBetweenButtons: actions.itemSpacing,
    primaryActionButtonKind: nameToVariantProperties(primaryButton.name)["Kind"].toLowerCase(),
    primaryPosition,
    secondaryActionButtonKind: nameToVariantProperties(secondaryButton.name)["Kind"].toLowerCase(),
  };
}

function alignItemsToAlignment(
  value: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN"
): "left" | "right" | "space-between" {
  switch (value) {
    case "MIN":
      return "left";
    case "MAX":
      return "right";
    case "SPACE_BETWEEN":
      return "space-between";
  }
  throw new Error(`Unexpected horizontal constraint: ${value}`);
}
