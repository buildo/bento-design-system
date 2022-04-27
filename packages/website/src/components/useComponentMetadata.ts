import useGlobalData from "@docusaurus/useGlobalData";

export function useComponentMetadata(constructorName: string) {
  return (useGlobalData()["docusaurus-plugin-structured-types"].default as any)[constructorName];
}

export function useComponentConfig(constructorName: string) {
  const metadata = useComponentMetadata(constructorName);

  return metadata?.parameters.find((p) => p.name === "config")?.properties;
}

export function useComponentProps(constructorName: string) {
  const metadata = useComponentMetadata(constructorName);

  return metadata?.returns.properties;
}
