type DotConfig = {
  color: "brandPrimary" | "brandSecondary" | "brandTertiary";
};
export type AreaLoaderConfig = {
  dots: DotConfig[];
  overlay: "light" | "dark";
  visibilityAreaColor: "primary" | "secondary" | "primary-inverse" | "secondary-inverse";
};
