import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().nonempty(),
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().nonempty(),
  EXPO_PUBLIC_SENTRY_DNS: z.string().nonempty(),
});

export function validateEnv(envVariables: Record<string, unknown>) {
  return envSchema.parse(envVariables);
}

export default validateEnv(process.env);