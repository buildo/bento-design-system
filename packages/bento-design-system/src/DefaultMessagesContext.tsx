import { createContext } from "react";
import { LocalizedString } from ".";

export type DefaultMessages = {
  defaultMessages: {
    Chip: {
      dismissButtonLabel: LocalizedString;
    };
    Banner: {
      dismissButtonLabel: LocalizedString;
    };
    Modal: {
      closeButtonLabel: LocalizedString;
    };
    SelectField: {
      noOptionsMessage: LocalizedString;
      multiOptionsSelected: (count: number) => LocalizedString;
      selectAllButtonLabel: LocalizedString;
      clearAllButtonLabel: LocalizedString;
    };
    SearchBar: {
      clearButtonLabel: LocalizedString;
    };
    Table: {
      noResultsTitle: LocalizedString;
      noResultsDescription: LocalizedString;
      missingValue: LocalizedString;
    };
    Loader: {
      loadingMessage: LocalizedString;
    };
    DateField: {
      previousMonthLabel: LocalizedString;
      nextMonthLabel: LocalizedString;
    };
    TextField: {
      showPasswordLabel: LocalizedString;
      hidePasswordLabel: LocalizedString;
    };
  };
};

export const DefaultMessagesContext = createContext<DefaultMessages | null>(null);
