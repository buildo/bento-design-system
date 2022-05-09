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
  createContentWithSidebar,
  createDisclosure,
  createDisclosureGroup,
  createFeedback,
  createFormFields,
  createFormLayoutComponents,
  createIconButton,
  createLayoutComponents,
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
  Label,
  Title,
  Placeholder,
  Popover,
  Link,
  ContentBlock,
  bentoSprinkles,
} from ".";
import * as icons from "./Icons";
import * as illustrations from "./Illustrations";
import { BentoConfig } from "./BentoConfig";
import { createProgressBar } from "./ProgressBar/createProgressBar";
import merge from "ts-deepmerge";
import { createSwitch } from "./Switch/createSwitch";
import { createUseComponentsShowcase } from "./createUseComponentsShowcase";
import { createInlineLoader } from "./InlineLoader/InlineLoader";
import { createDecorativeDivider } from "./Divider/Divider";

export function createBentoComponents<
  AtomsFn extends typeof bentoSprinkles,
  ChipCustomColor extends string = never
>(
  sprinkles: AtomsFn,
  config: Object.Partial<BentoConfig<AtomsFn, ChipCustomColor>, "deep"> = defaultConfigs
) {
  const Box = createBentoBox(sprinkles);

  const { Bleed, Column, Columns, Inline, Inset, Stack, Tiles } = createLayoutComponents(Box);

  const AreaLoader = createAreaLoader(merge(defaultConfigs.areaLoader, config.areaLoader ?? {}));

  const InlineLoader = createInlineLoader(
    merge(defaultConfigs.inlineLoader, config.inlineLoader ?? {})
  );

  const DecorativeDivider = createDecorativeDivider(
    merge(defaultConfigs.decorativeDivider, config.decorativeDivider ?? {}),
    { Box }
  );

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
    InlineLoader,
  });

  const Breadcrumb = createBreadcrumb(merge(defaultConfigs.breadcrumb, config.breadcrumb ?? {}));

  const Card = createCard(merge(defaultConfigs.card, config.card ?? {}));

  // NOTE(gabro): as any here because merge chokes up on the ChipConfig generic
  const Chip = createChip(merge(defaultConfigs.chip, config.chip ?? {}) as any, {
    Box,
    IconButton,
  });

  const ContentWithSidebar = createContentWithSidebar(Box);

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

  const { List, ListItem } = createListComponents(merge(defaultConfigs.list, config.list ?? {}));
  const Menu = createMenu(merge(defaultConfigs.menu, config.menu ?? {}), { List });

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
    DateField,
  } = createFormFields(
    {
      dropdown: merge(defaultConfigs.dropdown, config.dropdown ?? {}),
      field: merge(defaultConfigs.field, config.field ?? {}),
      input: merge(defaultConfigs.input, config.input ?? {}),
      selectionControl: merge(defaultConfigs.selectionControl, config.selectionControl ?? {}),
      slider: merge(defaultConfigs.slider, config.slider ?? {}),
      date: merge(defaultConfigs.dateField, config.dateField ?? {}),
    },
    { Tooltip, IconButton, Menu, Button }
  );

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

  const Table = createTable(merge(defaultConfigs.table, config.table ?? {}), {
    Tooltip,
    Feedback,
    IconButton,
  });
  const tableColumn = createTableColumns({ Button, ButtonLink, IconButton, Chip });

  const Tabs = createTabs(merge(defaultConfigs.folderTabs, config.tabs ?? {}));

  const { Toast, ToastProvider } = createToast(merge(defaultConfigs.toast, config.toast ?? {}), {
    Button,
    IconButton,
  });

  const DesignSystemProvider = createBentoProvider(ToastProvider);

  const components = {
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
    ContentBlock,
    ContentWithSidebar,
    CustomModal,
    DateField,
    DecorativeDivider,
    DesignSystemProvider,
    Disclosure,
    DisclosureGroup,
    Display,
    Feedback,
    Field,
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
    Tabs,
    Tiles,
    Title,
    Toast,
    ToastProvider,
    Tooltip,
    TextField,
  };

  const useComponentsShowcase = createUseComponentsShowcase(components);

  return {
    ...components,
    useComponentsShowcase,
  };
}
