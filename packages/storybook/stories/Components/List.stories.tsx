import { IconInfoSolid, IconNegativeSolid, IconWarningSolid, List, IconCheck, Box } from "..";
import { Children } from "@buildo/bento-design-system";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: List,
  args: {
    dividers: true,
    size: "medium",
  },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

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

export const SingleLine = {
  args: {
    items: [
      { kind: "single-line", label, href },
      { kind: "single-line", label: labelLong, href },
      { kind: "single-line", label, href },
      { kind: "single-line", label: labelRich, href },
    ],
  },
} satisfies Story;

export const SingleLineIcon = {
  args: {
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
  },
} satisfies Story;

export const SingleLineTrailingIcon = {
  args: {
    items: [
      { kind: "single-line", label, trailingIcon: IconInfoSolid, href },
      { kind: "single-line", label: labelLong, trailingIcon: IconNegativeSolid, href },
      { kind: "single-line", label, trailingIcon: IconWarningSolid, href },
    ],
  },
} satisfies Story;

export const TwoLineIcon = {
  args: {
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
  },
} satisfies Story;

export const OverlineIcon = {
  args: {
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
  },
} satisfies Story;

export const WithSpacing = {
  args: {
    items: [
      { kind: "single-line", label, href },
      { kind: "single-line", label: labelLong, href },
      { kind: "single-line", label, href },
      { kind: "single-line", label: labelRich, href },
    ],
    space: 8,
  },
} satisfies Story;

export const WithRoundBorders = {
  args: {
    items: [
      { kind: "single-line", borderRadius: 8, label, href },
      { kind: "single-line", borderRadius: 8, label: labelLong, href },
      { kind: "single-line", borderRadius: 8, label, href },
      { kind: "single-line", borderRadius: 8, label: labelRich, href },
    ],
    space: 8,
  },
} satisfies Story;
