import React from 'react';
import { addons } from '@storybook/addons';
import { useChannel } from '@storybook/api';
import { AddonPanel } from '@storybook/components';

import { themeKeys } from '../src/contexts/theme';

const ThemePanel = () => {
  const emit = useChannel({});
  return (
      <>
      {
          Object.keys(themeKeys).map(key => (
            <button onClick={() => emit('setTheme', { selected: themeKeys[key]})}>
                {`make ${themeKeys[key]}`}
            </button>
          ))
      }
      </>
  )
}

// Register the addon with a unique name.
addons.register('andrelandgraf/theme', api => {
  // Also need to set a unique name to the panel.
  addons.addPanel('andrelandgraf/theme-panel', {
    title: 'Theme Picker',
    render: ({ active, key }) => (
      <AddonPanel key={key} active={active}>
        <ThemePanel />
      </AddonPanel>
    ),
  });
});