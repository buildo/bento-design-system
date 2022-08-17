import { ComponentProps } from "react";
import { BentoProvider } from ".";
import { formatMessage } from "./util";

export const defaultMessages: ComponentProps<typeof BentoProvider>["defaultMessages"] = {
  Chip: {
    dismissButtonLabel: formatMessage("Remove"),
  },
  Banner: {
    dismissButtonLabel: formatMessage("Close"),
  },
  Modal: {
    closeButtonLabel: formatMessage("Close"),
  },
  SelectField: {
    noOptionsMessage: formatMessage("No options"),
    multiOptionsSelected: (n) => {
      const options = n > 1 ? "options" : "option";
      return formatMessage(`${n} ${options} selected`);
    },
    selectAllButtonLabel: formatMessage("Select all"),
    clearAllButtonLabel: formatMessage("Clear all"),
  },
  SearchBar: {
    clearButtonLabel: formatMessage("Clear"),
  },
  Table: {
    noResultsTitle: formatMessage("No results found"),
    noResultsDescription: formatMessage(
      "Try adjusting your search filters to find what you're looking for."
    ),
    missingValue: formatMessage("-"),
  },
  Loader: {
    loadingMessage: formatMessage("Loading..."),
  },
  DateField: {
    previousMonthLabel: formatMessage("Prev month"),
    nextMonthLabel: formatMessage("Next month"),
  },
  TextField: {
    showPasswordLabel: formatMessage("Show password"),
    hidePasswordLabel: formatMessage("Hide password"),
  },
};
