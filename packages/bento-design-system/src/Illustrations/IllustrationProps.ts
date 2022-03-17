export type IllustrationProps = {
  size: 24 | 32 | 40 | 80 | 145 | 160;
} & (
  | {
      style: "color";
    }
  | {
      style: "outline";
      color: "default" | "disabled" | "inherit";
    }
);
