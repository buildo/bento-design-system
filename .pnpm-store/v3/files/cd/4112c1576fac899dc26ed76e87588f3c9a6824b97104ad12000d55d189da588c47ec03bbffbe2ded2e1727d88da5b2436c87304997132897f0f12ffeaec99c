import { Theme } from '../models';

export function getHtmlClasses(theme: Theme) {
  return theme && theme.class
    ? theme.class instanceof Array
      ? theme.class.join(' ')
      : theme.class
    : '';
}
