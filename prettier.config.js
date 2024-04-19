/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: true,
  trailingComma: "es5",
  tabWidth: 4,
  bracketSpacing: true,
  singleQuote: false,
  arrowParens: "always",
  quoteProps: "consistent",
  printWidth: 120,
};

export default config;
