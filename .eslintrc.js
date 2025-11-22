module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2022,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react-hooks"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "off",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": "warn"
  }
};
