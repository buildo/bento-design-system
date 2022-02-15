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
} from "../src";
import { sprinkles } from "./sprinkles.css";

export * from "../src";
export const Box = createBentoBox(sprinkles);
export const { Stack, Column, Columns, Inline, Inset } = createLayoutComponents(Box);
export const { CheckboxField, NumberField, RadioGroupField, TextField } = createFormFields();
export const Button = createButton({});
export const Banner = createBanner({});
export const { Toast, ToastProvider } = createToast(Button, {});
export const Actions = createActions(Button);
export const Card = createCard<4 | 8 | 16>({});
export const Link = createLink();
export const Breadcrumb = createBreadcrumb(Link);
export const Modal = createModal(Actions);
export const Chip = createChip();
