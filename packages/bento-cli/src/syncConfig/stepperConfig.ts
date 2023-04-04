import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function stepperConfig(
  ctx: Ctx
): Omit<SimpleBentoConfig["stepper"], "doneIcon" | "labelUppercase"> {
  const { components } = ctx.findComponentsInPage("Stepper");
  const Stepper = components.find((c) => c.name === "Stepper (to detach)")!;
  const step = findChildByName(Stepper, "Step", "INSTANCE");
  const label = findChildByName(Stepper, "Label", "TEXT");
  const number = findChildByName(Stepper, "0", "TEXT");

  return {
    internalSpacing: step.itemSpacing,
    labelSize: ctx.typographyVariant(label).size,
    numberSize: ctx.typographyVariant(number).size,
    spaceBetweenSteps: Stepper.itemSpacing,
  };
}
