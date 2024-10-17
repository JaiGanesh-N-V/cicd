import globals from 'globals';
import pluginJs from '@eslint/js';

//npm init @eslint/config@latest
export default [{ languageOptions: { globals: globals.browser } }, pluginJs.configs.recommended];
