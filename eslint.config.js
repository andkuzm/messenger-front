// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import importPlugin from "eslint-plugin-import";

export default tseslint.config([
  {
    ignores: ["dist"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/features/auth",
              from: "./src/features",
              except: ["./auth"],
            },
            {
              target: "./src/features/comments",
              from: "./src/features",
              except: ["./comments"],
            },
            {
              target: "./src/features/discussions",
              from: "./src/features",
              except: ["./discussions"],
            },
            {
              target: "./src/features/teams",
              from: "./src/features",
              except: ["./teams"],
            },
            {
              target: "./src/features/users",
              from: "./src/features",
              except: ["./users"],
            },
            {
              target: "./src/features",
              from: "./src/app",
            },
            {
              target: [
                "./src/components",
                "./src/hooks",
                "./src/lib",
                "./src/types",
                "./src/utils",
              ],
              from: ["./src/features", "./src/app"],
            },
          ],
        },
      ],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
