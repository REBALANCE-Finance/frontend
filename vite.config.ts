import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import tsconfigPaths from "vite-tsconfig-paths";

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relative: string) => path.resolve(appDirectory, relative);
const root = path.resolve(__dirname, resolveApp("src"));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "[name]"
    })
  ],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    dedupe: ["react"],
    alias: {
      "@": `${root}/`,
      "@public": `${root}/../public`
    }
  }
});
