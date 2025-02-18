import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Disable specific rules
    rules: {
      // Disable the rule for unused variables
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", // Ignore variables starting with "_"
          varsIgnorePattern: "^_", // Ignore variables starting with "_"
          caughtErrors: "none", // Don't report caught errors
        },
      ],
      // Disable explicit 'any' types rule
      "@typescript-eslint/no-explicit-any": "off",
      // Disable react no unescaped entities rule
      "react/no-unescaped-entities": "off",
      // Disable react hooks exhaustive deps rule
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

export default eslintConfig;
