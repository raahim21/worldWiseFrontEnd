import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    proxy: {
      // Proxy all API calls starting with /api to your backend server
      "/cities": "http://localhost:3001",
    },
  },
});

// when creating a new react app with vite,
// do the following,
// 1)  npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev
// 2) go to .eslintrc.cjs file, if dosen't exist, create one, and then add the 'react-app' in the extends array in the module.exports
// 3) now in the vite.config.js add eslint and run it as a function in plugins in the array, import it as
// import eslint from "vite-plugin-eslint";

// for implementing routes install react-router-dom
