import { ComponentProps } from "react";
import { BentoProvider } from ".";

export const defaultMessages: ComponentProps<typeof BentoProvider>["defaultMessages"] = {
  Chip: {
    dismissButtonLabel: "Remove",
  },
  Banner: {
    dismissButtonLabel: "Close",
  },
  Modal: {
    closeButtonLabel: "Close",
  },
  SelectField: {
    noOptionsMessage: "No options",
    multiOptionsSelected: (n) => {
      const options = n > 1 ? "options" : "option";
      return `${n} ${options} selected`;
    },
    selectAllButtonLabel: "Select all",
    clearAllButtonLabel: "Clear all",
  },
  SearchBar: {
    clearButtonLabel: "Clear",
  },
  Table: {
    noResultsTitle: "No results found",
    noResultsDescription: "Try adjusting your search filters to find what you're looking for.",
    missingValue: "-",
  },
  Loader: {
    loadingMessage: "Loading...",
  },
  DateField: {
    previousMonthLabel: "Prev month",
    nextMonthLabel: "Next month",
  },
  TextField: {
    showPasswordLabel: "Show password",
    hidePasswordLabel: "Hide password",
  },
};
