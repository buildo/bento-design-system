import { Object } from "ts-toolbelt";
import {
  Body,
  createActions,
  createAreaLoader,
  createAvatar,
  createBanner,
  createBentoBox,
  createBentoProvider,
  createBreadcrumb,
  createButtons,
  createCard,
  createChip,
  createDisclosure,
  createDisclosureGroup,
  createFeedback,
  createFormFields,
  createFormLayoutComponents,
  createIconButton,
  createLayoutComponents,
  createLink,
  createListComponents,
  createMenu,
  createModal,
  createNavigation,
  createSearchBar,
  createStepper,
  createTable,
  createTableColumns,
  createTabs,
  createToast,
  createTooltip,
  defaultConfigs,
  Display,
  Headline,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
  IconClose,
  IconIdea,
  IconInformative,
  IconMinus,
  IconNegative,
  IconPlaceholder,
  IconPositive,
  IconSearch,
  IconUser,
  IconWarning,
  Label,
  Title,
  Placeholder,
  Popover,
  InlineLoader,
  IllustrationIdea,
  IllustrationNegative,
  IllustrationPositive,
  IllustrationSearch,
} from ".";
import { BentoConfig } from "./BentoConfig";
import { bentoSprinkles } from "./internal";
import { createProgressBar } from "./ProgressBar/createProgressBar";
import merge from "ts-deepmerge";
import { createSwitch } from "./Switch/createSwitch";

export function createBentoComponents<
  AtomsFn extends typeof bentoSprinkles = typeof bentoSprinkles,
  ChipCustomColor extends string = never
>(
  sprinkles?: AtomsFn,
  config: Object.Partial<BentoConfig<AtomsFn, ChipCustomColor>, "deep"> = defaultConfigs
) {
  const Box = createBentoBox(sprinkles ?? bentoSprinkles);

  const { Bleed, Column, Columns, Inline, Inset, Stack } = createLayoutComponents(Box);

  const AreaLoader = createAreaLoader(merge(defaultConfigs.areaLoader, config.areaLoader ?? {}));

  const Avatar = createAvatar(merge(defaultConfigs.avatar, config.avatar ?? {}));

  const { Button, ButtonLink } = createButtons(merge(defaultConfigs.button, config.button ?? {}));

  const IconButton = createIconButton(merge(defaultConfigs.iconButton, config.iconButton ?? {}));

  const Banner = createBanner(merge(defaultConfigs.banner, config.banner ?? {}), {
    Button,
    IconButton,
  });

  const Actions = createActions(merge(defaultConfigs.actions, config.actions ?? {}), {
    Button,
    Banner,
  });

  const Link = createLink(merge(defaultConfigs.link, config.link ?? {}));

  const Breadcrumb = createBreadcrumb(merge(defaultConfigs.breadcrumb, config.breadcrumb ?? {}), {
    Link,
  });

  const Card = createCard(merge(defaultConfigs.card, config.card ?? {}));

  // TODO(gabro): investigate as any here
  const Chip = createChip(merge(defaultConfigs.chip, config.chip ?? {}) as any, {
    Box,
    IconButton,
  });

  const Disclosure = createDisclosure(merge(defaultConfigs.disclosure, config.disclosure ?? {}));

  const DisclosureGroup = createDisclosureGroup(
    merge(defaultConfigs.disclosureGroup, config.disclosureGroup ?? {}),
    {
      Disclosure,
    }
  );

  const Feedback = createFeedback(merge(defaultConfigs.feedback, config.feedback ?? {}), {
    Button,
  });

  const { Form, FormRow, FormSection } = createFormLayoutComponents(
    merge(defaultConfigs.formLayout, config.formLayout ?? {}),
    {
      Actions,
    }
  );

  const Tooltip = createTooltip(merge(defaultConfigs.tooltip, config.tooltip ?? {}));

  const {
    CheckboxField,
    CheckboxGroupField,
    Field,
    NumberField,
    RadioGroupField,
    ReadOnlyField,
    SelectField,
    SliderField,
    TextField,
  } = createFormFields(
    {
      dropdown: merge(defaultConfigs.dropdown, config.dropdown ?? {}),
      field: merge(defaultConfigs.field, config.field ?? {}),
      input: merge(defaultConfigs.input, config.input ?? {}),
      selectionControl: merge(defaultConfigs.selectionControl, config.selectionControl ?? {}),
      slider: merge(defaultConfigs.slider, config.slider ?? {}),
    },
    { Tooltip }
  );

  const { List, ListItem } = createListComponents(merge(defaultConfigs.list, config.list ?? {}));

  const Menu = createMenu(merge(defaultConfigs.menu, config.menu ?? {}), { List });

  const { Modal, CustomModal } = createModal(merge(defaultConfigs.modal, config.modal ?? {}), {
    Actions,
    IconButton,
  });

  const Navigation = createNavigation(merge(defaultConfigs.navigation, config.navigation ?? {}));

  const ProgressBar = createProgressBar(
    merge(defaultConfigs.progressBar, config.progressBar ?? {})
  );

  const SearchBar = createSearchBar(merge(defaultConfigs.searchBar, config.searchBar ?? {}), {
    Field,
    IconButton,
  });

  const Stepper = createStepper(merge(defaultConfigs.stepper, config.stepper ?? {}));

  const Switch = createSwitch(
    merge(defaultConfigs.selectionControl.element, config.selectionControl?.element ?? {}),
    { Field }
  );

  const Table = createTable(merge(defaultConfigs.table, config.table ?? {}), { Tooltip, Feedback });
  const tableColumn = createTableColumns({ Button, ButtonLink, IconButton, Chip, Link });

  const FolderTabs = createTabs(merge(defaultConfigs.folderTabs, config.folderTabs ?? {}));

  const UnderlineTabs = createTabs(merge(defaultConfigs.underlineTabs, config.underlineTabs ?? {}));

  const { Toast, ToastProvider } = createToast(merge(defaultConfigs.toast, config.toast ?? {}), {
    Button,
    IconButton,
  });

  const DesignSystemProvider = createBentoProvider(ToastProvider);

  const icons = {
    IconIdea,
    IconCheck,
    IconChevronDown,
    IconChevronRight,
    IconChevronUp,
    IconClose,
    IconInformative,
    IconMinus,
    IconNegative,
    IconPlaceholder,
    IconPositive,
    IconSearch,
    IconUser,
    IconWarning,
  };

  const illustrations = {
    IllustrationIdea,
    IllustrationPositive,
    IllustrationNegative,
    IllustrationSearch,
  };

  return {
    ...icons,
    ...illustrations,
    Actions,
    AreaLoader,
    Avatar,
    Banner,
    Bleed,
    Body,
    Breadcrumb,
    Box,
    Button,
    ButtonLink,
    Card,
    CheckboxField,
    CheckboxGroupField,
    Chip,
    Column,
    Columns,
    CustomModal,
    DesignSystemProvider,
    Disclosure,
    DisclosureGroup,
    Display,
    Feedback,
    Field,
    FolderTabs,
    Form,
    FormRow,
    FormSection,
    Headline,
    IconButton,
    Inline,
    InlineLoader,
    Inset,
    Label,
    Link,
    List,
    ListItem,
    Menu,
    Modal,
    Navigation,
    NumberField,
    Placeholder,
    ProgressBar,
    Popover,
    SearchBar,
    Stepper,
    RadioGroupField,
    ReadOnlyField,
    SelectField,
    SliderField,
    Stack,
    Switch,
    Table,
    tableColumn,
    Title,
    Toast,
    ToastProvider,
    Tooltip,
    TextField,
    UnderlineTabs,
  };
}
