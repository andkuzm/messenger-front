import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],

    'import/no-restricted-paths': [ //general structure: https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md
      'error',
      {
        zones: [
          // disables cross-feature imports:
          // eg. src/features/discussions should not import from src/features/comments, etc.
          {
            target: './src/features/auth',
            from: './src/features',
            except: ['./auth'],
          },
          {
            target: './src/features/comments',
            from: './src/features',
            except: ['./comments'],
          },
          {
            target: './src/features/discussions',
            from: './src/features',
            except: ['./discussions'],
          },
          {
            target: './src/features/teams',
            from: './src/features',
            except: ['./teams'],
          },
          {
            target: './src/features/users',
            from: './src/features',
            except: ['./users'],
          },
          {
            target: './src/features',
            from: './src/app',
          },
          {
            target: [
              './src/components',
              './src/hooks',
              './src/lib',
              './src/types',
              './src/utils',
            ],
            from: ['./src/features', './src/app'],
          },
        ],
      },
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
