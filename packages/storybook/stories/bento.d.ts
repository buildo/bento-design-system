import "@buildo/bento-design-system";

declare module "@buildo/bento-design-system" {
  interface TypeOverrides {
    LocalizedString: string & { readonly LocalizedString: "LocalizedString" };
  }
}
