<script>
  import { onDestroy, onMount } from 'svelte';
  import addons from '@storybook/addons';

  import { CHANGE } from '../constants';
  import { getSelectedTheme, getSelectedThemeName } from '../shared';

  import { getHtmlClasses } from './shared';

  export let config;

  const channel = addons.getChannel();
  const lastValue = channel.last(CHANGE);
  const { Decorator, list, default: defaultTheme } = config;

  let themeName = (lastValue && lastValue[0]) || getSelectedThemeName(list, defaultTheme);
  $: theme = getSelectedTheme(list, themeName);
  $: themeClasses = getHtmlClasses(theme);

  function setThemeName(theme) {
    themeName = theme;
  }

  onMount(() => channel.on(CHANGE, setThemeName));
  onDestroy(() => channel.removeListener(CHANGE, setThemeName));
</script>

{#if Decorator}
  <svelte:component this={Decorator} theme={theme} themes={list} themeClasses={themeClasses} themeName={themeName}>
    <slot></slot>
  </svelte:component>
{:else}
  <div class={themeClasses}>
    <slot></slot>
  </div>
{/if}
