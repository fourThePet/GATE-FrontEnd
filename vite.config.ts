import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
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
        authToken:
          "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",
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
