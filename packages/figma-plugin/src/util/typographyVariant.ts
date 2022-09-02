import { Body, Display, Headline, Label, Title } from "@buildo/bento-design-system";

export function typographyVariant(node: TextNode):
  | {
      kind: "title";
      size: Parameters<typeof Title>[0]["size"];
    }
  | {
      kind: "display";
      size: Parameters<typeof Display>[0]["size"];
    }
  | {
      kind: "headline";
      size: Parameters<typeof Headline>[0]["size"];
    }
  | {
      kind: "body";
      size: Parameters<typeof Body>[0]["size"];
    }
  | {
      kind: "label";
      size: Parameters<typeof Label>[0]["size"];
    } {
  if (node.textStyleId === figma.mixed) {
    throw new Error(`Unexpected mixed text style for node: ${node}`);
  }

  const textStyle = figma.getStyleById(node.textStyleId) as TextStyle;

  const [name, variant] = textStyle.name.split("/");
  if (!name || !variant) {
    throw new Error("Unexpected text style " + textStyle.name);
  }
  const size = toSize(variant);

  switch (name) {
    case "Title":
      return { kind: "title", size };
    case "Body":
      return { kind: "body", size };
    case "Label":
      return { kind: "label", size };
    case "Display":
      return { kind: "display", size };
    case "Headline":
      return { kind: "headline", size };
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
