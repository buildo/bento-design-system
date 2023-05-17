import {
  Body,
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
  createBentoProvider,
  Actions,
  AreaLoader,
  Avatar,
  Banner,
  Breadcrumb,
  Card,
  Checkbox,
  Chip,
  ContentWithSidebar,
  CustomModal,
  DateField,
  DecorativeDivider,
  Disclosure,
  DisclosureGroup,
  Feedback,
  Field,
  FileUploaderField,
  Form,
  FormRow,
  FormSection,
  IconButton,
  InlineLoader,
  Menu,
  Modal,
  Navigation,
  ProgressBar,
  SearchBar,
  Stepper,
  Switch,
  Table,
  Tabs,
  Toast,
  ToastProvider,
  Tooltip,
  tableColumn,
  StepperStep,
  useComponentsShowcase,
  List,
  Divider,
} from ".";
import * as icons from "./Icons";
import { PartialBentoConfig } from "./BentoConfig";
import { SprinklesFn } from "./util/ConfigurableTypes";
import { CheckboxField } from "./CheckboxField/CheckboxField";
import { CheckboxGroupField } from "./CheckboxGroupField/CheckboxGroupField";
import { ListItem } from "./List/ListItem";
import { NumberField } from "./NumberField/NumberField";
import { RadioGroupField } from "./RadioGroupField/RadioGroupField";
import { ReadOnlyField } from "./ReadOnlyField/ReadOnlyField";
import { SelectField } from "./SelectField/SelectField";
import { SliderField } from "./SliderField/SliderField";
import { TextArea } from "./TextArea/TextArea";
import { TextField } from "./TextField/TextField";
import { TimeField } from "./TimeField/TimeField";

/** @deprecated Import components directly from "@buildo/bento-design-system" instead */
export function createBentoComponents(): R;

/** @deprecated Import components directly from "@buildo/bento-design-system" instead */
export function createBentoComponents<ChipCustomColor extends string = never>(
  config: PartialBentoConfig
): R;

/** @deprecated Import components directly from "@buildo/bento-design-system" instead */
export function createBentoComponents<
  SprinklesFn extends typeof bentoSprinkles,
  ChipCustomColor extends string = never
>(sprinkles: SprinklesFn, config?: PartialBentoConfig): R;

/** @deprecated Import components directly from "@buildo/bento-design-system" instead */
export function createBentoComponents<SprinklesFn extends typeof bentoSprinkles>(
  sprinkles?: SprinklesFn | PartialBentoConfig,
  config: PartialBentoConfig = defaultConfigs
): R {
  if (typeof sprinkles === "function") {
    return internalCreateBentoComponents(sprinkles, config);
  }
  return internalCreateBentoComponents(bentoSprinkles, config);
}

function internalCreateBentoComponents(
  sprinkles: SprinklesFn,
  config: PartialBentoConfig = defaultConfigs
) {
  const DesignSystemProvider = createBentoProvider(config, sprinkles);

  const components = {
    ...icons,
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
    BentoProvider: DesignSystemProvider,
    Disclosure,
    DisclosureGroup,
    Display,
    Divider,
    Feedback,
    Field,
    FileUploaderField,
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
    TimeField,
  };

  return {
    ...components,
    useComponentsShowcase,
  };
}

type R = ReturnType<typeof internalCreateBentoComponents>;
