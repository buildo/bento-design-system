import { createLayoutComponents, Placeholder, unsafeLocalizedString } from "../../src";
import { sprinkles } from "../sprinkles.css";

export default {
  title: "Layout",
};

const { Inline, Stack, Inset, Columns, Column } = createLayoutComponents(sprinkles);

export const InlineLayout = () => {
  return (
    <Inline space="16">
      <Placeholder width={200} />
      <Placeholder width={200} />
    </Inline>
  );
};

export const StackLayout = () => {
  return (
    <Stack space="12" dividers>
      <Placeholder />
      <Placeholder />
    </Stack>
  );
};

export const InsetLayout = () => {
  return (
    <Inset space="12">
      <Placeholder />
    </Inset>
  );
};

export const ColumnsLayout = () => {
  return (
    <Columns space="12">
      <Placeholder />
      <Placeholder />
    </Columns>
  );
};

export const ColumnsLayout2 = () => {
  return (
    <Columns space="12">
      <Column width="1/3">
        <Placeholder />
      </Column>
      <Placeholder />
    </Columns>
  );
};
