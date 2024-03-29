import { Meta, StoryObj } from "@storybook/react";
import { BentoConfigProvider, PaginationItemsPerPage as ItemsPerPage, Pagination } from "..";
import { action } from "@storybook/addon-actions";

const meta = {
  component: Pagination,
  args: {
    page: 1,
    pageCount: 5,
    itemsPerPage: 5,
    itemsPerPageOptions: {
      5: "5",
      10: "10",
      20: "20",
      50: "50",
    },
    onPageChange: (page: number) => action(`Page changed to ${page}`),
    onItemsPerPageChange: (itemsPerPage: ItemsPerPage[number]) =>
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
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const SinglePage = {
  args: {
    pageCount: 1,
  },
} satisfies Story;

export const SmallButtons = {
  decorators: [
    (Story) => (
      <BentoConfigProvider
        value={{
          pagination: {
            dropdownButtonSize: "small",
            navigationButtonSize: 16,
          },
        }}
      >
        <Story />
      </BentoConfigProvider>
    ),
  ],
} satisfies Story;
