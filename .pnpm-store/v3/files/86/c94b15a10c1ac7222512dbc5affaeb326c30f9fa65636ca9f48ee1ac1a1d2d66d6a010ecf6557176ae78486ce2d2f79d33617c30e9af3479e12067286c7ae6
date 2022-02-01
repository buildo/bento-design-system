import addons from '@storybook/addons';

import { CHANGE } from '../constants';
import { Theme } from '../models';
import { getSelectedTheme, getSelectedThemeName } from '../shared';

import { getHtmlClasses } from './shared';

const channel = addons.getChannel();

export const ThemeDecorator = {
  beforeDestroy() {
    channel.removeListener(CHANGE, this.setThemeName);
  },
  computed: {
    theme(): Theme {
      return getSelectedTheme(this.config.list, this.themeName);
    },
    themeClasses(): string {
      return getHtmlClasses(this.theme);
    },
  },
  data() {
    const lastValue = channel.last(CHANGE);
    return {
      themeName: (lastValue && lastValue[0]) || getSelectedThemeName(this.config.list, this.config.default)
    };
  },
  methods: {
    setThemeName(themeName: string) {
      this.themeName = themeName;
    }
  },
  mounted() {
    const channel = addons.getChannel();
    channel.on(CHANGE, this.setThemeName);
  },
  props: [ 'config' ],
  template: `
<component
  v-if="this.config.Decorator"
  :is="this.config.Decorator"
  :theme="theme"
  :themes="this.config.list"
  :themeClasses="themeClasses"
  :themeName="themeName"
>
  <slot></slot>
</component>
<div v-else :class="themeClasses">
  <slot></slot>
</div>`
};
