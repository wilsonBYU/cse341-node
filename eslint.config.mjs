import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  
  {
    files: ["**/*.js"], 
    languageOptions: {sourceType: "commonjs"},
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "quotes": ["error", "single",{ "allowTemplateLiterals": true }]
    }
  },
  {languageOptions: { 
    globals: {
      ...globals.browser, 
      process: "readonly"} 
    }
  },
  pluginJs.configs.recommended,
];