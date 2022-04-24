import "@buildo/bento-design-system";

declare module "@buildo/bento-design-system" {
  interface TypeOverrides {
    LocalizedString: "test1" | "test2";
  }
}
