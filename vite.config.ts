/// <reference types="vitest" />

import path from "path"
import { defineConfig } from "vite"
import { resolve } from "path"
import Vue from "@vitejs/plugin-vue"
import Unocss from "unocss/vite"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { name } from "./package.json"

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),

    vueJsx(),
    Unocss(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: "jsdom",
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/index.ts"),
      name: name,
      fileName: (format) => `${name}.${format}.ts`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
