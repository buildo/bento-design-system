export type IllustrationProps = {
  size: 24 | 32 | 40 | 80 | 160 | number;
} & (
  | {
      style: "color";
    }
  | {
      style: "outline";
      color: "default" | "disabled" | "inherit";
    }
);
