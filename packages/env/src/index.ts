import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'
import { getRuntimeVariable } from './getRuntimeVariable'

declare const window: {
  __ENV?: any
}

const guessNextAuthUrlForVercelPreview = (val: unknown): string | unknown => {
  if (
    (val && typeof val === 'string' && val.length > 0) ||
    process.env.VERCEL_ENV !== 'preview' ||
    !process.env.VERCEL_BUILDER_PROJECT_NAME ||
    !process.env.NEXT_PUBLIC_VERCEL_VIEWER_PROJECT_NAME
  )
    return val
  const isBuilder = (process.env.VERCEL_BRANCH_URL as string).includes(process.env.VERCEL_BUILDER_PROJECT_NAME)
  if (isBuilder) return `https://${process.env.VERCEL_BRANCH_URL}`
  return `https://${process.env.VERCEL_BRANCH_URL}`.replace(
    process.env.NEXT_PUBLIC_VERCEL_VIEWER_PROJECT_NAME,
    process.env.VERCEL_BUILDER_PROJECT_NAME,
  )
}

const guessViewerUrlForVercelPreview = (val: unknown): string | unknown => {
  if (
    (val && typeof val === 'string' && val.length > 0) ||
    process.env.VERCEL_ENV !== 'preview' ||
    !process.env.VERCEL_BUILDER_PROJECT_NAME ||
    !process.env.NEXT_PUBLIC_VERCEL_VIEWER_PROJECT_NAME
  )
    return val
  const isViewer = (process.env.VERCEL_BRANCH_URL as string).includes(
    process.env.NEXT_PUBLIC_VERCEL_VIEWER_PROJECT_NAME,
  )
  if (isViewer) return `https://${process.env.VERCEL_BRANCH_URL}`
  return `https://${process.env.VERCEL_BRANCH_URL}`.replace(
    process.env.VERCEL_BUILDER_PROJECT_NAME,
    process.env.NEXT_PUBLIC_VERCEL_VIEWER_PROJECT_NAME,
  )
}

const guessLandingUrlForVercelPreview = (val: unknown): string | unknown => {
  if (
    (val && typeof val === 'string' && val.length > 0) ||
    process.env.VERCEL_ENV !== 'preview' ||
    !process.env.VERCEL_LANDING_PROJECT_NAME
  )
    return val
  return `https://${process.env.VERCEL_BRANCH_URL}`
}

const boolean = z.enum(['true', 'false']).transform((value) => value === 'true')

const baseEnv = {
  server: {
    NODE_ENV: z.enum(['development', 'staging', 'production', 'test']).optional(),
    DATABASE_URL: z
      .string()
      .url()
      .refine((url) => url.startsWith('postgres') || url.startsWith('file:./')),
    ENCRYPTION_SECRET: z.string().length(32),
    NEXTAUTH_URL: z.preprocess(guessNextAuthUrlForVercelPreview, z.string().url()),
    DISABLE_SIGNUP: boolean.optional().default('false'),
    ADMIN_EMAIL: z
      .string()
      .min(1)
      .optional()
      .transform((val) => val?.split(',')),
    DEBUG: boolean.optional().default('false'),
    LANDING_PAGE_URL: z.preprocess(guessLandingUrlForVercelPreview, z.string().url().optional()),
    BACKEND_URL: z.string().url(),
    BACKEND_PORT: z.coerce.number().optional().default(3000),
  },
  client: {
    NEXT_PUBLIC_E2E_TEST: boolean.optional(),
    NEXT_PUBLIC_VIEWER_URL: z.preprocess(
      guessViewerUrlForVercelPreview,
      z
        .string()
        .min(1)
        .transform((val) => val.split(',')),
    ),
    NEXT_PUBLIC_CHAT_API_URL: z.string().url().optional(),
    // TODO: To remove to deploy chat API for all typebots
    NEXT_PUBLIC_USE_EXPERIMENTAL_CHAT_API_ON: z
      .string()
      .min(1)
      .transform((val) => val.split('/').map((s) => s.split(',').map((s) => s.split('|'))))
      .optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_E2E_TEST: getRuntimeVariable('NEXT_PUBLIC_E2E_TEST'),
    NEXT_PUBLIC_VIEWER_URL: getRuntimeVariable('NEXT_PUBLIC_VIEWER_URL'),
    NEXT_PUBLIC_CHAT_API_URL: getRuntimeVariable('NEXT_PUBLIC_CHAT_API_URL'),
    NEXT_PUBLIC_USE_EXPERIMENTAL_CHAT_API_ON: getRuntimeVariable('NEXT_PUBLIC_USE_EXPERIMENTAL_CHAT_API_ON'),
  },
}
const githubEnv = {
  server: {
    GITHUB_CLIENT_ID: z.string().min(1).optional(),
    GITHUB_CLIENT_SECRET: z.string().min(1).optional(),
  },
}

const facebookEnv = {
  server: {
    FACEBOOK_CLIENT_ID: z.string().min(1).optional(),
    FACEBOOK_CLIENT_SECRET: z.string().min(1).optional(),
  },
}

const smtpEnv = {
  server: {
    SMTP_USERNAME: z.string().min(1).optional(),
    SMTP_PASSWORD: z.string().min(1).optional(),
    SMTP_HOST: z.string().min(1).optional(),
    SMTP_PORT: z.coerce.number().optional().default(25),
    SMTP_AUTH_DISABLED: boolean.optional().default('false'),
    SMTP_SECURE: boolean.optional().default('false'),
    SMTP_IGNORE_TLS: boolean.optional(),
  },
  client: {
    NEXT_PUBLIC_SMTP_FROM: z.string().min(1).optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SMTP_FROM: getRuntimeVariable('NEXT_PUBLIC_SMTP_FROM'),
    NEXT_PUBLIC_SMTP_AUTH_DISABLED: getRuntimeVariable('SMTP_AUTH_DISABLED'),
  },
}

const customOAuthEnv = {
  server: {
    CUSTOM_OAUTH_NAME: z.string().min(1).optional().default('Custom OAuth'),
    CUSTOM_OAUTH_SCOPE: z.string().min(1).optional().default('openid profile email'),
    CUSTOM_OAUTH_CLIENT_ID: z.string().min(1).optional(),
    CUSTOM_OAUTH_CLIENT_SECRET: z.string().min(1).optional(),
    CUSTOM_OAUTH_WELL_KNOWN_URL: z.string().url().optional(),
    CUSTOM_OAUTH_USER_ID_PATH: z.string().min(1).optional().default('id'),
    CUSTOM_OAUTH_USER_EMAIL_PATH: z.string().min(1).optional().default('email'),
    CUSTOM_OAUTH_USER_NAME_PATH: z.string().min(1).optional().default('name'),
    CUSTOM_OAUTH_USER_IMAGE_PATH: z.string().min(1).optional().default('image'),
  },
}

const googleAuthEnv = {
  server: {
    GOOGLE_AUTH_CLIENT_ID: z.string().min(1).optional(),
    GOOGLE_AUTH_CLIENT_SECRET: z.string().min(1).optional(),
  },
}

const stripeEnv = {
  server: {
    STRIPE_SECRET_KEY: z.string().min(1).optional(),
    STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
    STRIPE_STARTER_PRICE_ID: z.string().min(1).optional(),
    STRIPE_STARTER_CHATS_PRICE_ID: z.string().min(1).optional(),
    STRIPE_PRO_PRICE_ID: z.string().min(1).optional(),
    STRIPE_PRO_CHATS_PRICE_ID: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string().min(1).optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: getRuntimeVariable('NEXT_PUBLIC_STRIPE_PUBLIC_KEY'),
  },
}

const s3Env = {
  server: {
    S3_ACCESS_KEY: z.string().min(1).optional(),
    S3_SECRET_KEY: z.string().min(1).optional(),
    S3_BUCKET: z.string().min(1).optional().default('typebot'),
    S3_PORT: z.coerce.number().optional(),
    S3_ENDPOINT: z.string().min(1).optional(),
    S3_SSL: boolean.optional().default('true'),
    S3_REGION: z.string().min(1).optional(),
    S3_PUBLIC_CUSTOM_DOMAIN: z.string().url().optional(),
  },
}

const vercelEnv = {
  server: {
    VERCEL_TOKEN: z.string().min(1).optional(),
    VERCEL_TEAM_ID: z.string().min(1).optional(),
    VERCEL_GIT_COMMIT_SHA: z.string().min(1).optional(),
    VERCEL_BUILDER_PROJECT_NAME: z.string().min(1).optional(),
    VERCEL_LANDING_PROJECT_NAME: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_VERCEL_VIEWER_PROJECT_NAME: z.string().min(1).optional(),
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: z.string().min(1).optional(),
    NEXT_PUBLIC_VERCEL_ENV: z.string().min(1).optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_VERCEL_VIEWER_PROJECT_NAME: getRuntimeVariable('NEXT_PUBLIC_VERCEL_VIEWER_PROJECT_NAME'),
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: getRuntimeVariable('NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA'),
    NEXT_PUBLIC_VERCEL_ENV: getRuntimeVariable('NEXT_PUBLIC_VERCEL_ENV'),
  },
}

const pexelsEnv = {
  client: {
    NEXT_PUBLIC_PEXELS_API_KEY: z.string().min(1).optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_PEXELS_API_KEY: getRuntimeVariable('NEXT_PUBLIC_PEXELS_API_KEY'),
  },
}

const redisEnv = {
  server: {
    REDIS_URL: z.string().url().optional(),
  },
}

export const env = createEnv({
  server: {
    ...baseEnv.server,
    ...githubEnv.server,
    ...facebookEnv.server,
    ...smtpEnv.server,
    ...googleAuthEnv.server,
    ...stripeEnv.server,
    ...s3Env.server,
    ...vercelEnv.server,
    ...redisEnv.server,
    ...customOAuthEnv.server,
  },
  client: {
    ...baseEnv.client,
    ...smtpEnv.client,
    ...stripeEnv.client,
    ...vercelEnv.client,
    ...pexelsEnv.client,
  },
  experimental__runtimeEnv: {
    ...baseEnv.runtimeEnv,
    ...smtpEnv.runtimeEnv,
    ...stripeEnv.runtimeEnv,
    ...vercelEnv.runtimeEnv,
    ...pexelsEnv.runtimeEnv,
  },
  skipValidation:
    process.env.SKIP_ENV_CHECK === 'true' || (typeof window !== 'undefined' && window.__ENV === undefined),
  onValidationError: (error): never => {
    const variables = error.map((value) => value.path)
    console.error('❌ Invalid environment variables:', variables)
    throw new Error('Environment validation failed: ' + variables.join(', '))
  },
  onInvalidAccess: (variable: string): never => {
    throw new Error(`❌ Attempted to access a server-side environment variable on the client: ${variable}`)
  },
})
