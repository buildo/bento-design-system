import addons, { makeDecorator, StoryContext, StoryGetter, WrapperSettings } from '@storybook/addons';

import { DECORATOR } from './constants';
import { Theme, ThemeConfig } from './models';
import parameters from './parameters';
import { getConfig } from './shared';

import { ThemeDecorator } from './decorators/vue';


function wrapper(getStory: StoryGetter, context: StoryContext, { parameters }: WrapperSettings) {
  const config = getConfig(parameters as ThemeConfig | Theme[]);
  const channel = addons.getChannel();
  channel.emit(DECORATOR);

  return {
    components: { ThemeDecorator },
    template: `
<theme-decorator :config="config">
  <story/>
</theme-decorator>`,
    data() {
      return { config };
    },
  }
}

export const withThemes = makeDecorator({ ...parameters, wrapper});

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
