import { vars } from "../../src/vars.css";
import { createLayoutComponents } from "../../src/Layout/Layout";
import { sprinkles } from "../sprinkles.css";
import { unsafeLocalizedString } from "../../src/util/LocalizedString";

export default {
  title: "Layout",
};

const { Inline, Stack, Inset, Columns, Column } = createLayoutComponents(sprinkles);

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

export const InsetLayout = () => {
  return (
    <Inset space={12}>
      <div>{unsafeLocalizedString("Test1")}</div>
    </Inset>
  );
};

export const ColumnsLayout = () => {
  return (
    <Columns space={12}>
      <div>{unsafeLocalizedString("Test1")}</div>
      <div>{unsafeLocalizedString("Test2")}</div>
    </Columns>
  );
};

export const ColumnsLayout2 = () => {
  return (
    <Columns space={12}>
      <Column width="1/3">{unsafeLocalizedString("Test1")}</Column>
      <Column>{unsafeLocalizedString("Test2")}</Column>
    </Columns>
  );
};
