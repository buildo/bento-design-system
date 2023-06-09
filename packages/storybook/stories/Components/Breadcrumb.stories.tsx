import { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "..";

const meta = {
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

// eslint-disable-next-line storybook/prefer-pascal-case
export const breadcrumb = {
  args: {
    items: [
      {
        label: "Root",
        href: "https://www.example.com",
      },
      {
        label: "1st Level",
        href: "https://www.example.com",
      },
      {
        label: "2nd Level",
        href: "https://www.example.com",
      },
      {
        label: "3rd Level",
        href: "https://www.example.com",
      },
      {
        label: "4th Level",
        href: "https://www.example.com",
      },
      {
        label: "5th Level",
      },
    ],
  },
} satisfies Story;
