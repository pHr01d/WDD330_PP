import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        login: resolve(__dirname, "src/login/index.html"),
        modify: resolve(__dirname, "src/modify/index.html"),
        catalog: resolve(__dirname, "src/catalog/index.html"),
        settings: resolve(__dirname,"src/settings/index.html")
      },
    },
  },
});
