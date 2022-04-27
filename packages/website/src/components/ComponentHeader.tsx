import * as React from "react";
import useGlobalData from "@docusaurus/useGlobalData";
import { useComponentMetadata } from "./useComponentMetadata";

export const ComponentHeader = ({ name }) => {
  const description = useComponentMetadata(name)?.description;

  return description || null;
};
