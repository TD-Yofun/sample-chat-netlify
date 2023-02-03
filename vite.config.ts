import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: `Suns chat on Netlify(${env.VITE_APP_ENV})`,
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
