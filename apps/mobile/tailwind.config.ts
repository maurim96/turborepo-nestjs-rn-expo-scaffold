import type { Config } from "tailwindcss";
import baseConfig from "@scaffold/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
} satisfies Config;
