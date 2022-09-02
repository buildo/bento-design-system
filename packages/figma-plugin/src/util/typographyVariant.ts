import { Body, Display, Headline, Label, Title } from "@buildo/bento-design-system";

export function typographyVariant(node: TextNode):
  | {
      type: "Title";
      size: Parameters<typeof Title>[0]["size"];
    }
  | {
      type: "Display";
      size: Parameters<typeof Display>[0]["size"];
    }
  | {
      type: "Headline";
      size: Parameters<typeof Headline>[0]["size"];
    }
  | {
      type: "Body";
      size: Parameters<typeof Body>[0]["size"];
    }
  | {
      type: "Label";
      size: Parameters<typeof Label>[0]["size"];
    } {
  if (node.textStyleId === figma.mixed) {
    throw new Error(`Unexpected mixed text style for node: ${node}`);
  }
  const style = figma.getStyleById(node.textStyleId) as TextStyle;
  const [name, variant] = style.name.split("/");
  if (!name || !variant) {
    throw new Error("Unexpected text style " + style.name);
  }
  const size = toSize(variant);
  switch (name) {
    case "Title":
      return { type: "Title", size };
    case "Body":
      return { type: "Body", size };
    case "Label":
      return { type: "Label", size };
    case "Display":
      return { type: "Display", size };
    case "Headline":
      return { type: "Headline", size };
    default:
      throw new Error("Unexpected text style name: " + name);
  }
}

function toSize(variant: string): "small" | "medium" | "large" {
  switch (variant) {
    case "Small":
    case "Small Link":
      return "small";
    case "Medium":
    case "Medium Link":
      return "medium";
    case "Large":
    case "Large Link":
      return "large";
    default:
      throw Error(`Unexpected size ${variant}`);
  }
}
