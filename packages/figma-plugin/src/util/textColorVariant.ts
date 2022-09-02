type Color = "primary" | "secondary" | "informative" | "warning" | "negative";

export function textColorVariant(node: TextNode): Color {
  if (node.fillStyleId === figma.mixed) {
    throw new Error(`Unexpected mixed fill style for node: ${node}`);
  }

  const paintStyle = figma.getStyleById(node.fillStyleId) as PaintStyle;

  switch (paintStyle.name) {
    case "Text/Primary":
      return "primary";
    case "Text/Secondary":
      return "secondary";
    case "Text/Informative":
      return "informative";
    case "Text/Warning":
      return "warning";
    case "Text/Negative":
      return "negative";
    default:
      throw Error(`Unexpected color ${paintStyle.name}`);
  }
}
