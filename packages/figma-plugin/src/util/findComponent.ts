import { stripEmojis } from "./stripEmojis";

export function findComponentInPage(
  pageName: string,
  componentSet?: string
): {
  page: PageNode;
  components: ComponentNode[];
  findWithVariants: (...properties: { [key: string]: string }[]) => ComponentNode;
} {
  // Components come last in the page list, so we look for the _last_ value to match, just in case
  // there are project components or instances with the same name.
  const page = [
    ...figma.root.children.filter((c) => stripEmojis(c.name).trim() === pageName),
  ].reverse()[0];

  const components = componentSet
    ? (
        page.findOne(
          (c) => c.type === "COMPONENT_SET" && c.name === componentSet
        ) as ComponentSetNode | null
      )?.findAllWithCriteria({ types: ["COMPONENT"] }) ?? []
    : page.findAllWithCriteria({ types: ["COMPONENT"] }) ?? [];

  return {
    page,
    components,
    findWithVariants: (properties) => componentByVariantProperties(components, properties),
  };
}

function componentByVariantProperties(
  components: ComponentNode[],
  ...properties: { [key: string]: string }[]
): ComponentNode {
  const component = components.find((c) => {
    return properties.some((properties) => {
      for (const [key, value] of Object.entries(properties)) {
        if (c.variantProperties?.[key] !== value) {
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
