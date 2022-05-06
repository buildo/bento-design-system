import * as React from "react";
import useGlobalData from "@docusaurus/useGlobalData";
import ReactMarkdown from "react-markdown";

export const ComponentHeader = ({ name }) => {
  const description = (
    useGlobalData()["docusaurus-plugin-react-docgen-typescript"].default as any
  ).find((x) => x.displayName === name)?.description;

  if (description) {
    return <ReactMarkdown>{description}</ReactMarkdown>;
  } else return null;
};
