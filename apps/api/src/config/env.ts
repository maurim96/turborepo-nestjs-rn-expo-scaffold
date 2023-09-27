import { z } from 'zod';

const envVariablesSchema = z.object({
  DATABASE_URL: z.string().url().nonempty(),
  NODE_ENV: z.enum(['production', 'staging', 'development', 'test']),
  CLERK_SECRET_KEY: z.string().nonempty(),
  SENTRY_DNS: z.string().nonempty(),
});

export default function validateEnv(
  envVariables: Record<string, any>,
): Record<string, any> {
  return envVariablesSchema.parse(envVariables);
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
  }
}
