import { ComponentProps } from "react";
import { BentoProvider } from "design-system";
import { useTranslation } from "react-i18next";

export const useDefaultMessages = (): ComponentProps<typeof BentoProvider>["defaultMessages"] => {
  const { t } = useTranslation();

  return {
    Chip: {
      dismissButtonLabel: t("common.chip.dismissButtonLabel", "Remove"),
    },
    Banner: {
      dismissButtonLabel: t("common.banner.dismissButtonLabel", "Close"),
    },
    Modal: {
      closeButtonLabel: t("common.modal.closeButtonLabel", "Close"),
    },
    SelectField: {
      noOptionsMessage: t("common.selectField.noOptionsMessage", "No options"),
      multiOptionsSelected: (n) => {
        const options =
          n > 1
            ? t("common.selectField.optionsPlural", "options")
            : t("common.selectField.optionsSingular", "option");
        return t("common.selectField.multiOptionsSelected", "{{n}} {{options}} selected", {
          n,
          options,
        });
      },
      selectAllButtonLabel: t("common.selectField.selectAllButtonLabel", "Select all"),
      clearAllButtonLabel: t("common.selectField.clearAllButtonLabel", "Clear all"),
      loadingMessage: t("common.selectField.loadingMessage", "Loading..."),
    },
    SearchBar: {
      clearButtonLabel: t("common.searchBar.clearButtonLabel", "Clear"),
    },
    Table: {
      noResultsTitle: t("common.table.noResultsTitle", "No results found"),
      noResultsDescription: t(
        "common.table.noResultsDescription",
        "Try adjusting your search filters to find what you're looking for."
      ),
      missingValue: t("common.table.missingValue", "-"),
    },
    Loader: {
      loadingMessage: t("common.loader.loadingMessage", "Loading..."),
    },
    DateField: {
      previousMonthLabel: t("common.dateField.previousMonthLabel", "Prev month"),
      nextMonthLabel: t("common.dateField.nextMonthLabel", "Next month"),
    },
    TextField: {
      showPasswordLabel: t("common.textField.showPasswordLabel", "Show password"),
      hidePasswordLabel: t("common.textField.hidePasswordLabel", "Hide password"),
    },
  };
};
