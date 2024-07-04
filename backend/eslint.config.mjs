import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 2021,
      env: { mocha: true },
    },
  },
  pluginJs.configs.recommended,
];
