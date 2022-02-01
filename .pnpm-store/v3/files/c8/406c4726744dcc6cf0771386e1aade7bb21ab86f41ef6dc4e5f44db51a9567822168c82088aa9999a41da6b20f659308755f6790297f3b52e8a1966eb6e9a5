import React, { useEffect, useState } from 'react';
import addons from '@storybook/addons';

import { CHANGE } from '../constants';
import { ThemeConfig } from '../models';
import { getSelectedTheme, getSelectedThemeName } from '../shared';

import { getHtmlClasses } from './shared';

interface Props {
  config: ThemeConfig;
}

const channel = addons.getChannel();

export const ThemeDecorator: React.FC<Props> = (props) => {
  const { children, config } = props;
  const { Decorator, list, default: defaultTheme } = config;

  const [themeName, setThemeName] = useState<string>(() => {
    const lastValue = channel.last(CHANGE);
    return (lastValue && lastValue[0]) || getSelectedThemeName(list, defaultTheme);
  });
  const theme = getSelectedTheme(list, themeName);
  const themeClasses = getHtmlClasses(theme);

  useEffect(() => {
    channel.on(CHANGE, setThemeName);
    return () => channel.removeListener(CHANGE, setThemeName);
  }, [setThemeName]);

  if (Decorator) {
    return (
      <Decorator theme={theme} themes={list} themeClasses={themeClasses} themeName={themeName}>
        {children}
      </Decorator>
    );
  }

  return (
    <div className={themeClasses}>
      {children}
    </div>
  );
}
