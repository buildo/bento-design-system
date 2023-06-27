import * as React from "react";
import { ItemsPerPageOption, Pagination } from "..";

export default function PaginationExample() {
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState<ItemsPerPageOption>(10);
  return (
    <Pagination
      page={page}
      onPageChange={setPage}
      pageCount={5}
      itemsPerPage={itemsPerPage}
      itemsPerPageOptions={{
        10: "10",
        25: "25",
        50: "50",
        100: "100",
      }}
      onItemsPerPageChange={setItemsPerPage}
      messages={{
        itemsPerPageOptionsLabel: "items per page",
        currentPageItemsLabel: (start: number, end: number, total: number) =>
          `${start}-${end} of ${total} items`,
        pageCountLabel: (pageCount: number) => `of ${pageCount} pages`,
        singlePageLabel: "1 page",
        previousPageButtonLabel: "Previous page",
        nextPageButtonLabel: "Next page",
      }}
    />
  );
}
