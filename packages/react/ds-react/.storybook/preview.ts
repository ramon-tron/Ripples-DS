import type { Preview, Decorator } from '@storybook/react-vite';
import React from 'react';
import { themes } from 'storybook/theming';
import 'material-symbols/rounded.css';
import '../src/tokens/tokens.css';
import '../src/tokens/tokens-dark.css';
import '../src/index.css';

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string) ?? 'light';
  const fullscreen = context.parameters.layout === 'fullscreen';
  return React.createElement(
    'div',
    {
      'data-theme': theme,
      style: {
        padding: fullscreen ? 0 : '1.5rem',
        minHeight: fullscreen ? '100vh' : undefined,
        boxSizing: 'border-box',
        background: theme === 'dark' ? '#1c1c1c' : '#ffffff',
      },
    },
    React.createElement(Story)
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    docs: {
      theme: themes.dark,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
