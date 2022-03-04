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
    };
    SearchBar: {
      clearButtonLabel: LocalizedString;
    };
  };
};

export const DefaultMessagesContext = createContext<DefaultMessages | null>(null);
