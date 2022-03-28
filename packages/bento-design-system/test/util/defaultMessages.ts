import { unsafeLocalizedString } from "../../src";
import { DefaultMessages } from "../../src/DefaultMessagesContext";

export const defaultMessages: DefaultMessages["defaultMessages"] = {
  Chip: {
    dismissButtonLabel: unsafeLocalizedString("Remove"),
  },
  Banner: {
    dismissButtonLabel: unsafeLocalizedString("Close"),
  },
  Modal: {
    closeButtonLabel: unsafeLocalizedString("Close"),
  },
  SelectField: {
    noOptionsMessage: unsafeLocalizedString("No options"),
    multiOptionsSelected: (n) => {
      const options = n > 1 ? "options" : "option";
      return unsafeLocalizedString(`${n} ${options} selected`);
    },
  },
  SearchBar: {
    clearButtonLabel: unsafeLocalizedString("Clear"),
  },
  Table: {
    noResultsTitle: unsafeLocalizedString("No results found"),
    noResultsDescription: unsafeLocalizedString(
      "Try adjusting your search filters to find what you're looking for."
    ),
    missingValue: unsafeLocalizedString("-"),
  },
  Loader: {
    loadingMessage: unsafeLocalizedString("Loading..."),
  },
};
