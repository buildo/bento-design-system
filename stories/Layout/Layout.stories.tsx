import { vars } from "../../src/vars.css";
import { createLayoutComponents } from "../../src/Layout/Layout";
import { sprinkles } from "../sprinkles.css";
import { unsafeLocalizedString } from "../../src/util/LocalizedString";

export default {
  title: "Layout",
};

const { Inline } = createLayoutComponents(sprinkles);

export const DefaultSpace = () => {
  return (
    <Inline space={16}>
      <div>{unsafeLocalizedString("Test1")}</div>
      <div>{unsafeLocalizedString("Test2")}</div>
    </Inline>
  );
};

export const CustomSpace = () => {
  return (
    <Inline space={12}>
      <div>{unsafeLocalizedString("Test1")}</div>
      <div>{unsafeLocalizedString("Test2")}</div>
    </Inline>
  );
};
