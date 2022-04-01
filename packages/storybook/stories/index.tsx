import "./fonts.css";
import {
  createBanner,
  createBentoBox,
  createBreadcrumb,
  createButtons,
  createActions,
  createCard,
  createFormFields,
  createLayoutComponents,
  createLink,
  createToast,
  createModal,
  createChip,
  createListComponents,
  createDisclosure,
  createDisclosureGroup,
  createTooltip,
  createTabs,
  createAreaLoader,
  createAvatar,
  createFormLayoutComponents,
  createSearchBar,
  createSwitch,
  createFeedback,
  IllustrationNegative,
  IllustrationPositive,
  createBentoProvider,
  createTable,
  createTableColumns,
  createNavigation,
  createMenu,
  createIconButton,
  defaultConfigs,
  createProgressBar,
} from "@buildo/bento-design-system";

import "@buildo/bento-design-system/lib/index.css";
import { sprinkles } from "./sprinkles.css";

export * from "@buildo/bento-design-system";
export const Box = createBentoBox(sprinkles);
export const { Stack, Column, Columns, Inline, Inset, Bleed } = createLayoutComponents(Box);
export const Tooltip = createTooltip();
export const {
  Field,
  CheckboxField,
  CheckboxGroupField,
  NumberField,
  RadioGroupField,
  SelectField,
  TextField,
  ReadOnlyField,
} = createFormFields(
  {
    field: defaultConfigs.field,
    input: defaultConfigs.input,
    selectionControl: defaultConfigs.selectionControl,
    dropdown: defaultConfigs.dropdown,
  },
  { Tooltip }
);
export const { Button, ButtonLink } = createButtons(defaultConfigs.button);
export const IconButton = createIconButton(defaultConfigs.iconButton);
export const Banner = createBanner(defaultConfigs.banner, { Button, IconButton });
export const Actions = createActions(defaultConfigs.actions, { Button, Banner });
export const { Form, FormSection, FormRow } = createFormLayoutComponents(
  defaultConfigs.formLayout,
  {
    Actions,
  }
);
export const { Toast, ToastProvider } = createToast(defaultConfigs.toast, { Button, IconButton });
export const BentoProvider = createBentoProvider(ToastProvider);
export const Card = createCard<24 | 32 | 40>(defaultConfigs.card);
export const Link = createLink(defaultConfigs.link);
export const Breadcrumb = createBreadcrumb(defaultConfigs.breadcrumb, { Link });
export const Modal = createModal(defaultConfigs.modal, { Actions, IconButton });
export const Chip = createChip(
  {
    ...defaultConfigs.chip,
    customColors: {
      custom: "customColor1",
    },
  },
  { Box, IconButton }
);
export const { List } = createListComponents(defaultConfigs.list);
export const Disclosure = createDisclosure(defaultConfigs.disclosure);
export const DisclosureGroup = createDisclosureGroup(defaultConfigs.disclosureGroup, {
  Disclosure,
});
export const FolderTabs = createTabs(defaultConfigs.folderTabs);
export const UnderlineTabs = createTabs(defaultConfigs.underlineTabs);
export const AreaLoader = createAreaLoader(defaultConfigs.areaLoader);
export const Avatar = createAvatar(defaultConfigs.avatar);
export const SearchBar = createSearchBar(defaultConfigs.searchBar, { Field, IconButton });
export const Switch = createSwitch(defaultConfigs.selectionControl.element, { Field });
const FeedbackBackground = (
  <svg viewBox="0 0 440 240">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M216.359.002c53.326-.339 88.99 43.31 105.704 88.826 17.02 46.353 18.03 100.923-25.166 130.506-45.698 31.296-110.66 25.407-155.721-6.625-40.128-28.524-41.51-78.741-26.019-122.566C131.055 45.165 163.854.336 216.359.002Z"
      fill="#FFE6EB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M132.77 49.555c18.055 19.479 32.965 45.343 20.779 69.088-13.551 26.405-44.408 39.55-73.332 33.314-27.746-5.981-45.566-31.366-48.568-59.593C28.696 64.6 40.92 35.869 66.707 24.953c24.014-10.167 48.423 5.57 66.063 24.602Z"
      fill="#EFE6FF"
      style={{
        mixBlendMode: "multiply",
      }}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M402.634 144.466c17.137 9.029 24.196 30.235 19.175 48.98-4.464 16.666-21.996 24.115-39.161 25.637-16.614 1.474-34.836-3.115-41.269-18.504-6.25-14.952 4.501-29.877 16.464-40.836 12.87-11.788 29.38-23.397 44.791-15.277Z"
      fill="#FFF8E1"
    />
  </svg>
);
export const Feedback = createFeedback(
  {
    ...defaultConfigs.feedback,
    background: FeedbackBackground,
    negativeIllustration: IllustrationNegative,
    positiveIllustration: IllustrationPositive,
  },
  { Button }
);
export const Table = createTable(defaultConfigs.table, { Tooltip, Feedback });
export const tableColumn = createTableColumns({ Button, ButtonLink, Chip, Link, IconButton });
export const Navigation = createNavigation(defaultConfigs.navigation);
export const Menu = createMenu(defaultConfigs.menu, { List });
export const ProgressBar = createProgressBar(defaultConfigs.progressBar);
