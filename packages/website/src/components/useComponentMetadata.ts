import useGlobalData from "@docusaurus/useGlobalData";

export function useComponentMetadata(componentName: string) {
  return (useGlobalData()["docusaurus-plugin-react-docgen-typescript"].default as any).find(
    (x) => x.displayName === componentName
  );
}

export function useComponentProps(componentName: string) {
  return useComponentMetadata(componentName)?.props;
}
