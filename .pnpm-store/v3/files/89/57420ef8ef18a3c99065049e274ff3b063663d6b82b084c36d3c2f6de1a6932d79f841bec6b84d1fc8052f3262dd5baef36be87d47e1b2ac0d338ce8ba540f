import React, { useEffect } from 'react';
// @ts-ignore
import { document } from 'global';

import { Theme } from '../models';

interface Props {
  iframeId: string;
  selectedTheme: Theme;
  themes: Theme[];
  target?: string;
}

export const ThemeStory: React.FC<Props> = (props) => {
  const { iframeId, selectedTheme, target, themes } = props;

  useEffect(() => {
    let targetEl: HTMLElement;
    const iframe = document.getElementById(iframeId);
    if (!iframe) {
      return null;
    }

    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    switch(target) {
        case 'root':
        case 'html':
          targetEl = iframeDocument.documentElement;
        break;
        default:
          if(!target || target === 'body') {
            targetEl = iframeDocument.body;
          } else {
            targetEl = iframeDocument.documentElement.querySelector(target);
          }
        break;
    }

    // Add selected theme class(es).
    if (selectedTheme && selectedTheme.class) {
      if (typeof selectedTheme.class === 'string') {
        targetEl.classList.add(selectedTheme.class)
      } else { // string[]
        targetEl.classList.add(...selectedTheme.class)
      }
    }

    return () => themes
      .filter(theme => theme.class)
      .forEach(theme => {
        if (typeof theme.class === 'string') {
          targetEl.classList.remove(theme.class)
        } else { // string[]
          targetEl.classList.remove(...theme.class)
        }
      });
  });

  return null;
}
