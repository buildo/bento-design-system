import { createBentoComponents, bentoSprinkles } from "@buildo/bento-design-system";

export * from "@buildo/bento-design-system";

export const {
  Actions,
  AreaLoader,
  Body,
  Box,
  Button,
  Column,
  Columns,
  ContentBlock,
  DesignSystemProvider,
  Form,
  FormSection,
  FormRow,
  Inline,
  Inset,
  Placeholder,
  NumberField,
  RadioGroupField,
  SliderField,
  Stack,
  TextField,
  Tiles,
  SelectField,
} = createBentoComponents(bentoSprinkles);
