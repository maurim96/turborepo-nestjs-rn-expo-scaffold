import { fileURLToPath } from "url";

/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
    "^(next/(.*)$)|^(next$)",
    "^(expo(.*)$)|^(expo$)",
    "^@scaffold/(.*)$",
    "^~/",
    "^[../]",
    "^[./]",
    "",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "4.4.0",
};

export default config;
