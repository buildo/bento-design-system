export function findComponent(pageName: string): {
  page: PageNode;
  components: ComponentNode[];
  findWithVariants: (properties: { [key: string]: string }) => ComponentNode | undefined;
} {
  const page = figma.root.findChild((c) => stripEmojis(c.name).trim() === pageName) as PageNode;
  const components = page.findAllWithCriteria({ types: ["COMPONENT"] }) ?? [];

  return {
    page,
    components,
    findWithVariants: (properties) => componentByVariantProperties(components, properties),
  };
}

function componentByVariantProperties(
  components: ComponentNode[],
  properties: { [key: string]: string }
): ComponentNode | undefined {
  const component = components.find((c) => {
    for (const [key, value] of Object.entries(properties)) {
      if (c.variantProperties?.[key] !== value) {
        return false;
      }
    }
    return true;
  });
  if (!component) {
    console.warn("No component found matching these properties:", properties);
  }
  return component;
}

function stripEmojis(text: string) {
  return text.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ""
  );
}
