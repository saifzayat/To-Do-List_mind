import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";
import zayatEslintRules from "zayat-eslint-rules";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      zayatEslintRules.configs.strict,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ["**/ui/**/*.{ts,tsx}"],
    rules: {
      "custom/one-component-per-file": "off",
      "custom/no-inline-objects": "off",
      "custom/no-inline-functions": "off",
      "custom/no-nested-ternary": "off",
      "react-refresh/only-export-components": "off",
      "react-hooks/purity": "off",
      "@typescript-eslint/naming-convention": "off",
      "custom/boolean-naming-convention": [
        "error",
        {
          allowedPrefixes: [
            "show",
            "hide",
            "as",
            "open",
            "close",
            "with",
            "can",
          ],
        },
      ],
    },
  },
  {
    files: ["**/main.tsx"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  {
    files: ["**/store/index.ts"],
    rules: {
      "no-restricted-imports": "off",
      "no-restricted-syntax": "off",
    },
  },
]);
