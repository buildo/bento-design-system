import { Object } from "ts-toolbelt";
import {
  Body,
  createActions,
  createAreaLoader,
  createAvatar,
  createBanner,
  createBentoProvider,
  createBreadcrumb,
  createCard,
  createChip,
  createContentWithSidebar,
  createDisclosure,
  createDisclosureGroup,
  createFeedback,
  createFormFields,
  createFormLayoutComponents,
  createIconButton,
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
  Box,
  Bleed,
  Column,
  Columns,
  Inline,
  Inset,
  Tiles,
  Stack,
  Button,
  ButtonLink,
} from ".";
import * as icons from "./Icons";
import * as illustrations from "./Illustrations";
import { BentoConfig } from "./BentoConfig";
import { createProgressBar } from "./ProgressBar/ProgressBar";
import merge from "ts-deepmerge";
import { createSwitch } from "./Switch/createSwitch";
import { createUseComponentsShowcase } from "./createUseComponentsShowcase";
import { createInlineLoader } from "./InlineLoader/InlineLoader";
import { createDecorativeDivider } from "./Divider/Divider";
import { createCheckbox } from "./Checkbox/Checkbox";
import { SprinklesFn } from "./util/SprinklesFn";

type PartialConfig = Object.Partial<BentoConfig, "deep">;

export function createBentoComponents(): R;

export function createBentoComponents<ChipCustomColor extends string = never>(
  config: PartialConfig
): R;

export function createBentoComponents<
  SprinklesFn extends typeof bentoSprinkles,
  ChipCustomColor extends string = never
>(sprinkles: SprinklesFn, config?: PartialConfig): R;

export function createBentoComponents<SprinklesFn extends typeof bentoSprinkles>(
  sprinkles?: SprinklesFn | PartialConfig,
  config: PartialConfig = defaultConfigs
): R {
  if (typeof sprinkles === "function") {
    return internalCreateBentoComponents(sprinkles, config);
  }
  return internalCreateBentoComponents(bentoSprinkles, config);
}

function internalCreateBentoComponents(
  _sprinkles: SprinklesFn,
  config: PartialConfig = defaultConfigs
) {
  const AreaLoader = createAreaLoader(merge(defaultConfigs.areaLoader, config.areaLoader ?? {}));

  const InlineLoader = createInlineLoader(
    merge(defaultConfigs.inlineLoader, config.inlineLoader ?? {})
  );

  const DecorativeDivider = createDecorativeDivider(
    merge(defaultConfigs.decorativeDivider, config.decorativeDivider ?? {}),
    { Box }
  );

  const Avatar = createAvatar(merge(defaultConfigs.avatar, config.avatar ?? {}));

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

  const Checkbox = createCheckbox(
    merge(defaultConfigs.selectionControl.element, config.selectionControl?.element ?? {})
  );

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
    TextArea,
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

  const { Stepper, Step: StepperStep } = createStepper(
    merge(defaultConfigs.stepper, config.stepper ?? {})
  );

  const Switch = createSwitch(
    merge(defaultConfigs.selectionControl.element, config.selectionControl?.element ?? {}),
    { Field }
  );

  const Table = createTable(merge(defaultConfigs.table, config.table ?? {}), {
    Tooltip,
    Feedback,
    IconButton,
  });
  const tableColumn = createTableColumns({ Button, ButtonLink, IconButton, Chip, Tooltip });

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
    Checkbox,
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
    StepperStep,
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
    TextArea,
  };

  const useComponentsShowcase = createUseComponentsShowcase(components);

  return {
    ...components,
    useComponentsShowcase,
  };
}

type R = ReturnType<typeof internalCreateBentoComponents>;
