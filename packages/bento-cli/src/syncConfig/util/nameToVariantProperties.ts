/**
 * Convert a component name like "Switch=Trailing, Selected=False, State=Disabled"
 * to an object like { Switch: "Trailing", Selected: "False", State: "Disabled" }
 *
 * This is because Figma Rest API does not expose the variant properties in a component.
 */
export function nameToVariantProperties(name: string) {
  return name.split(", ").reduce((acc, prop) => {
    const [key, value] = prop.split("=");
    return { ...acc, [key]: value };
  }, {} as Record<string, string>);
}
