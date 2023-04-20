import "@buildo/bento-design-system/index.css";
import "./theme.css";
import {
  createBentoProvider,
  defaultConfigs,
  withBentoConfig,
  createBentoComponents,
} from "@buildo/bento-design-system";
import { sprinkles } from "./sprinkles.css";

export { BarChart, DonutChart, LineChart, useChart } from "@buildo/bento-design-system";

// NOTE(gabro): we're still using createBentoComponents instead of exporting the
// components directly from @buildo/bento-design-system due to
// https://github.com/storybookjs/storybook/issues/12185
// In short, Storybook (which uses react-docgen-typescript) does not pick up the
// props when the component comes from an external library.
//
// The workaround would be to wrap each component in another component that just
// re-exports it (see https://github.com/storybookjs/storybook/issues/13502#issuecomment-752897475),
// but that would be way too inconvenient.
//
// Using createBentoComponents creates the components directly in Storybook, so
// their props are picked up correctly.
//
// We tried several solutions from the linked issues, but it seems our monorepo
// setup make this particularly tricky
export const {
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
  ContentWithSidebar,
  CustomModal,
  DateField,
  DecorativeDivider,
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
  Pagination,
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
  IconLightbulb,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
  IconInfoSolid,
  IconMinus,
  IconNegative,
  IconNegativeSolid,
  IconPlaceholder,
  IconPositiveSolid,
  IconSearch,
  IconUser,
  IconWarningSolid,
  IconX,
  useComponentsShowcase,
} = createBentoComponents();

export {
  useToast,
  svgIconProps,
  icons,
  BentoConfigProvider,
  Time,
} from "@buildo/bento-design-system";

export type {
  CheckboxProps,
  IconProps,
  Omit,
  PaginationItemsPerPage,
  PaginationProps,
  SelectFieldProps,
  SliderFieldProps,
  TableProps,
  TooltipProps,
} from "@buildo/bento-design-system";

export const BentoProvider = createBentoProvider(
  {
    chip: {
      customColors: {
        custom: "customColor1",
      },
    },
    pagination: {
      itemsPerPageOptions: [5, 10, 20, 50],
    },
  },
  undefined,
  sprinkles
);

export const FolderTabs = Tabs;
export const UnderlineTabs = withBentoConfig({ tabs: defaultConfigs.underlineTabs }, Tabs);
export const RightActions = Actions;
export const LeftActions = withBentoConfig(
  {
    actions: {
      ...defaultConfigs.actions,
      buttonsAlignment: "left",
      primaryPosition: "left",
    },
  },
  Actions
);
export const SpaceBetweenActions = withBentoConfig(
  {
    actions: {
      ...defaultConfigs.actions,
      buttonsAlignment: "spaceBetween",
    },
  },
  Actions
);
