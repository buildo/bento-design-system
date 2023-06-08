import { SearchBar } from "../";
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

export const searchBar = {
  args: {
    value: "design systems",
  },
} satisfies Story;
