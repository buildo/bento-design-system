import { StoryObj } from "@storybook/react";
import { ItemsPerPage, Pagination } from "../";
import { action } from "@storybook/addon-actions";

const meta = {
  component: Pagination,
  args: {
    page: 1,
    pageCount: 5,
    itemsPerPage: 10,
    itemsPerPageOptions: {
      10: "10",
      25: "25",
      50: "50",
      100: "100",
    },
    onPageChange: (page: number) => action(`Page changed to ${page}`),
    onItemsPerPageChange: (itemsPerPage: ItemsPerPage) =>
      action(`Items per page changed to ${itemsPerPage}`),
    messages: {
      itemsPerPageOptionsLabel: "items per page",
      currentPageItemsLabel: (start: number, end: number, total: number) =>
        `${start}-${end} of ${total} items`,
      pageCountLabel: (pageCount: number) => `of ${pageCount} pages`,
      singlePageLabel: "1 page",
      previousPageButtonLabel: "Previous page",
      nextPageButtonLabel: "Next page",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const SinglePage = {
  args: {
    pageCount: 1,
  },
} satisfies Story;
