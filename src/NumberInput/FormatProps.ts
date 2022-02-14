export type FormatProps =
  | {
      kind: "currency";
      currency: string;
    }
  | {
      kind: "percentage";
    }
  | {
      kind?: "decimal";
    };
