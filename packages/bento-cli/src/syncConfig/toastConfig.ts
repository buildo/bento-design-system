import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { nameToVariantProperties } from "./util/nameToVariantProperties.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function toastConfig(ctx: Ctx): Omit<SimpleBentoConfig["toast"], "closeIcon"> {
  const { findWithVariants } = ctx.findComponentsInPage("Toast");
  const Toast = findWithVariants({
    Kind: "Informative",
    Action: "True",
    Dismissable: "True",
  });

  const buttonInstance = findChildByName(Toast, "Button", "INSTANCE");
  const button = ctx.componentFromInstance(buttonInstance);
  const buttonProperties = nameToVariantProperties(button.name);
  const closeIcon = findChildByName(Toast, "Icon Button", "INSTANCE");
  const message = findChildByName(Toast, "Message", "TEXT");

  return {
    buttonKind: buttonProperties["Kind"].toLowerCase(),
    buttonSize: buttonProperties["Size"].toLowerCase(),
    closeIconSize: closeIcon.absoluteBoundingBox.width,
    elevation: ctx.elevationVariant(Toast),
    internalSpacing: Toast.itemSpacing,
    messageSize: ctx.typographyVariant(message).size,
    paddingX: Toast.paddingLeft,
    paddingY: Toast.paddingTop,
    radius: Toast.cornerRadius,
    outline: false, // TODO: how to get this?
  };
}
