import { createComponentStories } from "../util";
import { IconInfoSolid, IconNegativeSolid, IconWarningSolid, List, IconCheck, Box } from "..";
import { Children } from "@buildo/bento-design-system";

const { defaultExport, createStory } = createComponentStories({
  component: List,
  args: {
    dividers: true,
    size: "medium",
  },
  argTypes: {},
});

const label = "List item";
const labelLong =
  "Exceedingly long list item label that should wrap to multiple lines. Let's check with a veeeeeeery long long string. Is it working? I hope so. Exceedingly long list item label that should wrap to multiple lines. Let's check with a veeeeeeery long long string. Is it working? I hope so.";
const labelRich = (
  <>
    Hello{" "}
    <Box as="span" fontWeight="bodyStrong">
      bold
    </Box>
  </>
) as Children;
const secondLine = "description";
const secondLineLong =
  "Exceedingly long list item descrption that should wrap to multiple lines. Let's check with a veeeeeeery long long string. Is it working? I hope so. Exceedingly long list item description that should wrap to multiple lines. Let's check with a veeeeeeery long long string. Is it working? I hope so.";
const overline = "Overline";
const overlineLong =
  "Exceedingly long overline that should wrap to multiple lines. Let's check with a veeeeeeery long long string. Is it working? I hope so. Exceedingly long overline that should wrap to multiple lines. Let's check with a veeeeeeery long long string. Is it working? I hope so.";
const href = "https://www.example.com";

export default defaultExport;

export const SingleLine = createStory({
  items: [
    { kind: "single-line", label, href },
    { kind: "single-line", label: labelLong, href },
    { kind: "single-line", label, href },
    { kind: "single-line", label: labelRich, href },
  ],
});

export const SingleLineIcon = createStory({
  items: [
    { kind: "single-line", label, icon: IconInfoSolid, href },
    { kind: "single-line", label: labelLong, icon: IconNegativeSolid, href },
    { kind: "single-line", label, icon: IconWarningSolid, href },
    {
      kind: "single-line",
      label: "Disabled",
      icon: IconCheck,
      disabled: true,
      href,
    },
  ],
});

export const SingleLineTrailingIcon = createStory({
  items: [
    { kind: "single-line", label, trailingIcon: IconInfoSolid, href },
    { kind: "single-line", label: labelLong, trailingIcon: IconNegativeSolid, href },
    { kind: "single-line", label, trailingIcon: IconWarningSolid, href },
  ],
});

export const TwoLineIcon = createStory({
  items: [
    {
      kind: "two-line",
      label,
      secondLine,
      icon: IconInfoSolid,
      href,
    },
    {
      kind: "two-line",
      label: labelLong,
      secondLine: secondLineLong,
      icon: IconInfoSolid,
      href,
    },
    {
      kind: "two-line",
      label,
      secondLine: secondLineLong,
      icon: IconInfoSolid,
      href,
    },
  ],
});

export const OverlineIcon = createStory({
  items: [
    {
      kind: "overline",
      label,
      overline,
      icon: IconInfoSolid,
      href,
    },
    {
      kind: "overline",
      label: labelLong,
      overline: overlineLong,
      icon: IconInfoSolid,
      href,
    },
    {
      kind: "overline",
      label,
      overline: overlineLong,
      icon: IconInfoSolid,
      href,
    },
  ],
});

export const WithSpacing = createStory({
  items: [
    { kind: "single-line", label, href },
    { kind: "single-line", label: labelLong, href },
    { kind: "single-line", label, href },
    { kind: "single-line", label: labelRich, href },
  ],
  space: 8,
});

export const WithRoundBorders = createStory({
  items: [
    { kind: "single-line", borderRadius: 8, label, href },
    { kind: "single-line", borderRadius: 8, label: labelLong, href },
    { kind: "single-line", borderRadius: 8, label, href },
    { kind: "single-line", borderRadius: 8, label: labelRich, href },
  ],
  space: 8,
});
