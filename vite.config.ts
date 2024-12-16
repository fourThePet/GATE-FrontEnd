import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
      sentryVitePlugin({
        org: "ohhyeryeong",
        project: "javascript-react",
        authToken: env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          filesToDeleteAfterUpload: "**/*.map",
        },
      }),
    ],
    build: {
      sourcemap: mode === "production", // Production에서만 sourcemap 생성
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("@sentry")) {
              return "@sentry";
            }
            if (id.includes("node_modules")) {
              const module =
                id.split("node_modules/").pop()?.split("/")[0] || "unknown";
              return `vendor-${module}`;
            }
          },
        },
      },
    },
  };
});
