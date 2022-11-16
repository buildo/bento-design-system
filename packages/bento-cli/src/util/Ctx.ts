import * as Figma from "figma-api";
import { ComponentMetadata, GetFileNodesResult, StyleMetadata } from "figma-api/lib/api-types.js";
import { FigmaNodeWithChildren } from "../syncConfig/util/FigmaNodeWithChildren.js";
import { stripEmojis } from "./stripEmojis.js";
import { Body, Display, Headline, Label, Title } from "@buildo/bento-design-system";
import { nameToVariantProperties } from "../syncConfig/util/nameToVariantProperties.js";
import ora from "ora";

export class Ctx {
  static async fromFigma(fileKey: string, personalAccessToken: string): Promise<Ctx> {
    const figma = new Figma.Api({ personalAccessToken });

    const nodesLoader = ora("Fetching nodes from Figma file").start();
    const nodes = (await figma.getFile(fileKey)).document.children;
    nodesLoader.succeed();

    const componentsLoader = ora("Fetching components from Figma file").start();
    const components = (await figma.getFileComponents(fileKey)).meta!.components;
    componentsLoader.succeed();

    const stylesLoader = ora("Fetching styles from Figma file").start();
    const styles = (await figma.getFileStyles(fileKey)).meta!.styles;
    const styleNodeIds = styles.map((style) => style.node_id);
    const styleNodes = (
      (await figma.getFileNodes(fileKey, styleNodeIds)) as GetFileNodesResult<"RECTANGLE">
    ).nodes;
    stylesLoader.succeed();

    const iconsLoader = ora("Fetching icons from Figma file").start();
    const iconNodeIds = components
      .filter((component) => component.containing_frame?.pageName?.match(/Iconography$/))
      .filter((component) => component.name.includes("➕"))
      .map((component) => component.node_id);
    const iconNodes = (
      (await figma.getFileNodes(fileKey, iconNodeIds, {
        geometry: "paths",
      })) as GetFileNodesResult<"COMPONENT">
    ).nodes;
    iconsLoader.succeed();

    return new Ctx(nodes, styles, styleNodes, iconNodes, components);
  }

  private constructor(
    public nodes: FigmaNodeWithChildren[],
    public styles: StyleMetadata[],
    public styleNodes: GetFileNodesResult<"RECTANGLE">["nodes"],
    public iconNodes: GetFileNodesResult<"COMPONENT">["nodes"],
    public components: ComponentMetadata[]
  ) {}

  getNodeById(id: string, nodes: FigmaNodeWithChildren[] = this.nodes): Figma.Node | undefined {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      } else if (node.children) {
        const child = this.getNodeById(id, node.children);
        if (child) {
          return child;
        }
      }
    }
    return undefined;
  }

  findComponentsInPage(
    pageName: string,
    componentSet?: string
  ): {
    components: Figma.Node<"COMPONENT">[];
    findWithVariants: (...properties: { [key: string]: string }[]) => Figma.Node<"COMPONENT">;
  } {
    const componentsInPage = this.components.filter(
      (c) =>
        stripEmojis(c.containing_frame?.pageName)?.trim() === pageName &&
        (componentSet ? stripEmojis(c.containing_frame?.name)?.trim() === componentSet : true)
    );

    return {
      components: componentsInPage.map(
        (c) => this.getNodeById(c.node_id) as Figma.Node<"COMPONENT">
      ),
      findWithVariants: (properties) => {
        const { node_id } = componentByVariantProperties(componentsInPage, properties);
        return this.getNodeById(node_id) as Figma.Node<"COMPONENT">;
      },
    };
  }

  typographyVariant(node: Figma.Node<"TEXT">):
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
    const textStyle = this.styles.find((style) => style.node_id === (node.styles! as any).text)!;

    const [name, variant] = textStyle.name.split("/");
    if (!name || !variant) {
      throw new Error("Unexpected text style " + textStyle.name);
    }
    const size = toTypographySize(variant);

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

  elevationVariant(node: Figma.Node): "none" | "small" | "medium" | "large" {
    const effectStyleNodeId = (node as any).styles?.effect;
    if (!effectStyleNodeId) {
      return "none";
    }
    const effectStyle = this.styles.find((style) => style.node_id === effectStyleNodeId)!;

    switch (effectStyle.name) {
      case "Elevation/Small":
        return "small";
      case "Elevation/Medium":
        return "medium";
      case "Elevation/Large":
        return "large";
    }

    throw new Error(`Unexpected effect style ${effectStyle.name}`);
  }

  textColorVariant(
    node: Figma.Node<"TEXT">
  ): "primary" | "secondary" | "informative" | "warning" | "negative" | "primary-inverse" {
    const fillStyleNodeId = (node as any).styles?.fill!;
    const fillStyle = this.styles.find((style) => style.node_id === fillStyleNodeId)!;
    switch (fillStyle.name) {
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
      case "Text/Primary Inverse":
        return "primary-inverse";
      default:
        throw Error(`Unexpected color ${fillStyle.name}`);
    }
  }

  backgroundColorVariant(
    node: Figma.Node
  ):
    | "primary"
    | "secondary"
    | "primary-inverse"
    | "secondary-inverse"
    | "light-scrim"
    | "dark-scrim"
    | "none" {
    const fillStyleNodeId = (node as any).styles?.fills!;
    const fillStyle = this.styles.find((style) => style.node_id === fillStyleNodeId)!;
    switch (fillStyle.name) {
      case "Background/Primary":
        return "primary";
      case "Background/Secondary":
        return "secondary";
      case "Background/Primary Inverse":
        return "primary-inverse";
      case "Background/Secondary Inverse":
        return "secondary-inverse";
      case "Background/Light Scrim":
        return "light-scrim";
      case "Background/Dark Scrim":
        return "dark-scrim";
      default:
        throw Error(`Unexpected background color ${fillStyle.name}`);
    }
  }

  colorVariant(node: Figma.Node): string {
    const fillStyleNodeId = (node as any).styles?.fill! ?? (node as any).styles?.fills!;
    const fillStyle = this.styles.find((style) => style.node_id === fillStyleNodeId)!;

    const [prefix, variant] = fillStyle.name.split("/");
    return `${prefix.toLowerCase()}${variant.split(" ").join("")}`;
  }

  componentFromInstance(instance: Figma.Node<"INSTANCE">): ComponentMetadata {
    const component = this.components.find((c) => c.node_id === instance.componentId)!;
    return component;
  }
}

function componentByVariantProperties(
  components: ComponentMetadata[],
  ...properties: { [key: string]: string }[]
): ComponentMetadata {
  const component = components.find((c) => {
    return properties.some((properties) => {
      for (const [key, value] of Object.entries(properties)) {
        const variantProperties = nameToVariantProperties(c.name);
        if (variantProperties?.[key] !== value) {
          return false;
        }
      }
      return true;
    });
  });

  if (!component) {
    throw new Error(
      `No component found matching these properties:\n${JSON.stringify(properties, null, 2)}`
    );
  }
  return component;
}

function toTypographySize(variant: string): "small" | "medium" | "large" {
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
