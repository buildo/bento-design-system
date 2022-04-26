import config from "@generated/docusaurus.config";
import * as React from "react";
import styles from "./ExternalLinkCard.module.css";
import { useColorMode } from "@docusaurus/theme-common";

type Props = {
  label: string;
} & (
  | {
      type: "github";
      componentName: string;
    }
  | {
      type: "zeroheight";
      slug: string;
    }
  | {
      type: "storybook";
      storyId: string;
    }
);

export function ExternalLinkCard(props: Props) {
  const { colorMode } = useColorMode();

  const link = ((): string => {
    switch (props.type) {
      case "github":
        return `https://github.com/${config.organizationName}/${config.projectName}/tree/main/packages/bento-design-system/src/${props.componentName}`;
      case "zeroheight":
        return `https://zeroheight.com/1424b583b/p/${props.slug}`;
      case "storybook":
        return `https://storybook.bento.our.buildo.io/?path=/story/${props.storyId}`;
    }
  })();

  const image = (() => {
    switch (props.type) {
      case "github":
        switch (colorMode) {
          case "dark":
            return "/img/github_dark.svg";
          case "light":
            return "/img/github_light.svg";
        }
      case "zeroheight":
        return "/img/zeroheight.png";
      case "storybook":
        return "/img/storybook.svg";
    }
  })();

  const label = (() => {
    switch (props.type) {
      case "github":
        return "GitHub";
      case "zeroheight":
        return "zeroheight";
      case "storybook":
        return "Storybook";
    }
  })();

  return (
    <a className={styles.card} href={link} target="_blank" rel="noreferrer">
      <div className={styles.image}>
        <img src={image} alt="" />
      </div>
      {label}
    </a>
  );
}
