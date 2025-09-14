import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  globalIgnores([
    "dist",
    "*.config.js",
    "*.config.ts",
    "vite.config.*",
    "eslint.config.*",
  ]),
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"],
        },
      },
    },
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": [
        "error",
        { varsIgnorePattern: "^[A-Z_]", argsIgnorePattern: "^_" },
      ],

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-undef": "error", // Catch undefined variables
      "import/no-unresolved": ["error", { commonjs: true, amd: true }],
    },
  },
]);
