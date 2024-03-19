import path from "path";
import { defineConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import tsconfigPaths from "vite-tsconfig-paths";

// Путь к папке с иконками
const iconDirs = path.resolve(process.cwd(), "src/assets/icons");

export default defineConfig({
  plugins: [
    tsconfigPaths(), // Автоматическое разрешение путей из tsconfig.json
    createSvgIconsPlugin({
      iconDirs: [iconDirs],
      symbolId: "[name]"
    }),
    // Рассмотрите возможность добавления других плагинов для оптимизации, если это необходимо
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  build: {
    // Оптимизация для production
    minify: "terser", // Минификация кода
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    chunkSizeWarningLimit: 500
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@chakra-ui/react", "mobx", "react-router-dom"]
  }
});
