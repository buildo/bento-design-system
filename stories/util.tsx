import { Parameters, ComponentMeta, ComponentStory } from "@storybook/react";
import { JSXElementConstructor, ComponentProps, useState } from "react";
import { alignToFlexAlignLookup, alignYToFlexAlignLookup } from "../src/util/align";
import { unsafeLocalizedString } from "../src/util/LocalizedString";
import { vars } from "./theme.css";
import { Omit } from "../src/util/Omit";

export type Actions<Props> = {
  [k in keyof Props]-?: k extends `on${infer _}` ? k : never;
}[keyof Props];

export function createComponentStories<
  C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  D extends Partial<ComponentProps<C>>
>(
  meta: Omit<ComponentMeta<C>, "title"> & { component: C; args: D }
): {
  defaultExport: Omit<ComponentMeta<C>, "title">;
  createStory: (
    args: Omit<ComponentProps<C>, keyof D | Actions<ComponentProps<C>>>,
    parameters?: Parameters
  ) => ComponentStory<C>;
  createControlledStory: <S>(
    initialValue: S,
    args: Omit<ComponentProps<C>, keyof D | Actions<ComponentProps<C>> | "value">,
    parameters?: Parameters
  ) => ComponentStory<C>;
} {
  return {
    defaultExport: meta,
    createStory: (args: any, parameters: any): ComponentStory<C> => {
      const Component = meta.component as any;
      const Template = (args: any) => <Component {...args} />;
      const S = Template.bind({}) as any;
      S.parameters = parameters;
      S.args = args;
      return S;
    },
    createControlledStory: <S extends unknown>(
      initialValue: S,
      args: any,
      parameters: any
    ): ComponentStory<C> => {
      const Component = meta.component as any;
      const Template = (args: any) => {
        const [value, onChange] = useState(initialValue);
        return <Component {...args} value={value} onChange={onChange} />;
      };
      const S = Template.bind({}) as any;
      S.parameters = parameters;
      S.args = args;
      return S;
    },
  };
}

type ArgType = {
  options?: string[];
  control?: {
    type?: "text" | "select" | "array";
    mapping?: { [k: string]: string };
    disable?: boolean;
  };
};

export const textArgType: ArgType = { control: { type: "text" } };
export const disableControlArgType: ArgType = { control: { disable: true } };
export const spaceArgType: ArgType = {
  options: Object.keys(vars.space),
  control: {
    type: "select",
    mapping: vars.space,
  },
};
export const alignArgType: ArgType = {
  options: Object.keys(alignToFlexAlignLookup),
  control: {
    type: "select",
    mapping: alignToFlexAlignLookup,
  },
};

export const alignYArgType: ArgType = {
  options: Object.keys(alignYToFlexAlignLookup),
  control: {
    type: "select",
    mapping: alignYToFlexAlignLookup,
  },
};

export const issuesArgType: ArgType = { control: { type: "array" } };

export const fieldArgTypes = {
  label: textArgType,
  assistiveText: textArgType,
  issues: issuesArgType,
};

export const formatMessage = unsafeLocalizedString;
