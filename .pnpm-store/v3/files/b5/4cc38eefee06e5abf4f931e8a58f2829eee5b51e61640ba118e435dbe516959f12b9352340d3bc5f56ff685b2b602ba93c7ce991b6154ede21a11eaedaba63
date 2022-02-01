import { API } from '@storybook/api';

import { PARAM_KEY } from './constants';
import { Theme, ThemeConfig } from './models';

const defaultOptions: ThemeConfig = {
  clearable: true,
  list: []
};

export function getConfigFromApi(api: API): ThemeConfig {
  const data = api.getCurrentStoryData() as any as { parameters: { [parameterName: string]: any } };
  return getConfig(data && data.parameters && data.parameters[PARAM_KEY]);
}

export function getConfig(parameters: ThemeConfig | Theme[]): ThemeConfig {
  const options = parameters instanceof Array
    ? { list: parameters }
    : parameters;

  return {
    ...defaultOptions,
    ...options
  };
}

export function getSelectedThemeName(list: Theme[], defaultTheme?: string, currentSelectedValue?: string): string {
  if (!list.length) {
    return 'none';
  }

  if (currentSelectedValue === 'none') {
    return currentSelectedValue;
  }

  if (currentSelectedValue && list.find(i => i.name === currentSelectedValue)) {
    return currentSelectedValue;
  }

  if (defaultTheme) {
    return defaultTheme;
  }

  if (list.find(i => i.default)) {
    return list.find(i => i.default).name;
  }

  return 'none';
}

export function getSelectedTheme(list: Theme[], themeName: string): Theme {
  return list.find(({ name }) => name === themeName);
}
