import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "vite-plugin-fs";
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), fs(), pluginRewriteAll()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      external: [
          'virtual:fs',
      ]
    }
  },
  base: '/<REPO>/',
   mime: {
	     'text/x-typescript': ['ts','tsx']
   }
});
