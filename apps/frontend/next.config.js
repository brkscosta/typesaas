import "@typesaas/env";
import { configureRuntimeEnv } from "next-runtime-env/build/configure.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const injectViewerUrlIfVercelPreview = (val) => {
  if (
    (val && typeof val === "string" && val.length > 0) ||
    process.env.VERCEL_ENV !== "preview" ||
    !process.env.VERCEL_BUILDER_PROJECT_NAME ||
    !process.env.NEXT_PUBLIC_VERCEL_VIEWER_PROJECT_NAME
  )
    return;
  process.env.NEXT_PUBLIC_VIEWER_URL =
    `https://${process.env.VERCEL_BRANCH_URL}`.replace(
      process.env.VERCEL_BUILDER_PROJECT_NAME,
      process.env.NEXT_PUBLIC_VERCEL_VIEWER_PROJECT_NAME
    );
  if (process.env.NEXT_PUBLIC_CHAT_API_URL?.includes("{{pr_id}}"))
    process.env.NEXT_PUBLIC_CHAT_API_URL =
      process.env.NEXT_PUBLIC_CHAT_API_URL.replace(
        "{{pr_id}}",
        process.env.VERCEL_GIT_PULL_REQUEST_ID
      );
};

injectViewerUrlIfVercelPreview(process.env.NEXT_PUBLIC_VIEWER_URL);

configureRuntimeEnv();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
    turbo: {
      resolveAlias: {
        underscore: "lodash",
        mocha: { browser: "mocha/browser-entry.js" },
      },
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingRoot: join(__dirname, "../../"),
  serverExternalPackages: ["isolated-vm"],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "pt", "pt-BR", "de", "ro", "es", "it", "el"],
  },
  webpack: (config) => {
    config.resolve.alias["minio"] = false;
    config.resolve.alias["qrcode"] = false;
    config.resolve.alias["isolated-vm"] = false;
    return config;
  },
};

export default nextConfig;
