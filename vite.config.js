import { defineConfig } from "vite";
import { resolve } from "node:path";

// Pages: the scrolling home page, the events hub and the activities list.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        events: resolve(import.meta.dirname, "events.html"),
        activities: resolve(import.meta.dirname, "activities.html"),
      },
    },
  },
});
