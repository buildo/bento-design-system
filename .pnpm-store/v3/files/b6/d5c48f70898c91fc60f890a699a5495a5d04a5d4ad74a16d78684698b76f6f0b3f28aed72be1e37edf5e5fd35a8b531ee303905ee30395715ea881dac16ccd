import React from 'react';
import { addons, types } from '@storybook/addons';

import { ADDON_ID } from './constants';
import { ThemeSelector } from './manager';

addons.register(ADDON_ID, api => {
  addons.add(ADDON_ID, {
    title: 'Themes',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: () => <ThemeSelector api={api} />,
  });
});
