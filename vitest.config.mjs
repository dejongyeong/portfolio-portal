// reference: https://markus.oberlehner.net/blog/using-testing-library-jest-dom-with-vitest
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    setupFiles: ["./vitest.setup.ts"],
    env: loadEnv("", process.cwd(), ""),
    globals: true,
    include: ["src/**/*.test.{js,jsx,ts,tsx}"],
    exclude: ["node_modules", "dist", "build", "coverage"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*"],
      exclude: [
        "src/**/*.test.{js,jsx,ts,tsx}",
        "src/**/*.stories.{js,jsx,ts,tsx}",
        "src/**/*.d.ts",
      ],
      ignoreEmptyLines: true,
    },
    workspace: [
      {
        extends: true,
        test: {
          environment: "jsdom",
          include: ["src/**/*.test.{ts,tsx}"],
        },
      },
    ],
  },
  optimizeDeps: {
    include: ["vitest > @vitest/expect > chai"],
  },
});
