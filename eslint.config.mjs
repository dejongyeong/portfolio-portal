import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import jestDom from "eslint-plugin-jest-dom";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import testingLibrary from "eslint-plugin-testing-library";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = [
  js.configs.recommended,

  // next.js already includes react, react-hooks, and jsx-a11y rules
  ...nextCoreWebVitals,
  ...nextTypescript,

  // app or source files
  {
    plugins: {
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
      "react-refresh": reactRefresh,
      //"jsx-a11y": jsxA11y,
    },
    rules: {
      semi: "error",
      quotes: ["error", "double"],
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  // test files
  {
    files: ["**/*.test.ts?(x)"],
    ...testingLibrary.configs["flat/react"],
    ...jestDom.configs["flat/recommended"],
  },
  eslintPluginPrettierRecommended,
  {
    ignores: ["node_modules", ".next", "out", "public", "build", "coverage"],
  },
];

export default eslintConfig;
