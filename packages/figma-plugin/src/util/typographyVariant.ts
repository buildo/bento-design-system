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
    }
  | undefined {
  if (node.textStyleId === figma.mixed) {
    console.warn("Unexpected mixed text style for node", node);
    return undefined;
  }
  const style = figma.getStyleById(node.textStyleId) as TextStyle;
  const [name, variant] = style.name.split("/");
  if (!name || !variant) {
    console.warn("Unexpected text style", style.name);
    return undefined;
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
      console.log("Unexpected text style", style.name);
      return undefined;
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
