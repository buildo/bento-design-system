import * as React from "react";
import useGlobalData from "@docusaurus/useGlobalData";
import ReactMarkdown from "react-markdown";

export const ComponentHeader = ({ name }: { name: string }) => {
  const description = (
    useGlobalData()["docusaurus-plugin-react-docgen-typescript"].default as any
  ).find((x: { displayName: string }) => x.displayName === name)?.description;

  if (description) {
    return <ReactMarkdown>{description}</ReactMarkdown>;
  } else return null;
};
