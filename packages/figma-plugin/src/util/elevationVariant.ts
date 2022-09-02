export function elevationVariant(node: ComponentNode): "none" | "small" | "medium" | "large" {
  const effectStyle = figma.getStyleById(node.effectStyleId) as EffectStyle;

  switch (effectStyle.name) {
    case "Elevation/Small":
      return "small";
    case "Elevation/Medium":
      return "medium";
    case "Elevation/Large":
      return "large";
  }

  return "none";
}
