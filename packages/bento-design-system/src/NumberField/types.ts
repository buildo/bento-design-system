import { Children } from "../util/Children";
import { LocalizedString } from "../util/LocalizedString";

export type BaseNumberProps = {
  placeholder?: LocalizedString;
  isReadOnly?: boolean;
  rightAccessory?: Children;
};

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
