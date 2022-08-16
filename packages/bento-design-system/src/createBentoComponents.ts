import { List, Object } from "ts-toolbelt";
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
} from ".";
import * as icons from "./Icons";
import * as illustrations from "./Illustrations";
import { BentoConfig } from "./BentoConfig";
import { SprinklesFn } from "./util/SprinklesFn";
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
  sprinkles: SprinklesFn,
  config: PartialConfig = defaultConfigs
) {
  const DesignSystemProvider = createBentoProvider(config, sprinkles);

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

  return {
    ...components,
    useComponentsShowcase,
  };
}

type R = ReturnType<typeof internalCreateBentoComponents>;
