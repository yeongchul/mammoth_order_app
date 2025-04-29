import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: ".", // 현재 폴더를 루트로 설정
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "src/main.tsx", // 명확하게 진입점 지정
    },
  },
});
