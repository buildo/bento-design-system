import * as React from "react";
import useGlobalData from "@docusaurus/useGlobalData";

export const ComponentHeader = ({ name }) => {
  const description = (
    useGlobalData()["docusaurus-plugin-react-docgen-typescript"].default as any
  ).find((x) => x.displayName === name)?.description;

  if (description) {
    return description;
  } else return null;
};
