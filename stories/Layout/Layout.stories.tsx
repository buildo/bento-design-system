import { vars } from "../../src/vars.css";
import { createLayoutComponents } from "../../src/Layout/Layout";
import { sprinkles } from "../sprinkles.css";
import { unsafeLocalizedString } from "../../src/util/LocalizedString";

export default {
  title: "Layout",
};

const { Inline, Stack } = createLayoutComponents(sprinkles);

export const InlineLayout = () => {
  return (
    <Inline space={16}>
      <div>{unsafeLocalizedString("Test1")}</div>
      <div>{unsafeLocalizedString("Test2")}</div>
    </Inline>
  );
};

export const StackLayout = () => {
  return (
    <Stack space={12} dividers>
      <div>{unsafeLocalizedString("Test1")}</div>
      <div>{unsafeLocalizedString("Test2")}</div>
    </Stack>
  );
};
