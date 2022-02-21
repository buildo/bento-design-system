import "./fonts.css";
import "../src/reset.css";
import {
  createBanner,
  createBentoBox,
  createBreadcrumb,
  createButton,
  createActions,
  createCard,
  createFormFields,
  createLayoutComponents,
  createLink,
  createToast,
  createModal,
  createChip,
  createList,
  createDisclosure,
  createDisclosureGroup,
  createTooltip,
  createTabs,
  createAreaLoader,
  createAvatar,
  createFormLayoutComponents,
} from "../src";
import { sprinkles } from "./sprinkles.css";

export * from "../src";
export const Box = createBentoBox(sprinkles);
export const { Stack, Column, Columns, Inline, Inset } = createLayoutComponents(Box);
export const Button = createButton({});
export const Actions = createActions(Button);
export const { Form, FormSection, FormRow } = createFormLayoutComponents(Actions);
export const { CheckboxField, NumberField, RadioGroupField, SelectField, TextField } =
  createFormFields();
export const Banner = createBanner({});
export const { Toast, ToastProvider } = createToast(Button, {});
export const Card = createCard<24 | 32 | 40>({});
export const Link = createLink();
export const Breadcrumb = createBreadcrumb(Link);
export const Modal = createModal(Actions);
export const Chip = createChip();
export const List = createList();
export const Disclosure = createDisclosure();
export const DisclosureGroup = createDisclosureGroup(Disclosure);
export const Tooltip = createTooltip();
export const Tabs = createTabs();
export const AreaLoader = createAreaLoader();
export const Avatar = createAvatar();
