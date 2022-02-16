export type IllustrationProps = {
  size: 32 | 40 | 80 | 160;
} & (
  | {
      style: "color";
    }
  | {
      style: "outline";
      color: "default" | "disabled";
    }
);
