import { SearchBar } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: SearchBar,
  args: {
    "aria-label": "Search for anything",
    placeholder: "Search for anything",
  },
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

// eslint-disable-next-line storybook/prefer-pascal-case
export const searchBar = {
  args: {
    value: "design systems",
  },
} satisfies Story;
