import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Weather-App/",
  build: { outDir: "docs" },
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        name: "Weather & Quotes App",
        short_name: "WeatherApp",
        description: "App with weather forecast and random quotes.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#f59e0b",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },

      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.open-meteo\.com\/v1\/forecast/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "weather-api-cache",
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 600, // 10 minut
              },
            },
          },
          {
            urlPattern: /^https:\/\/geocoding-api\.open-meteo\.com\/v1\//i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "geocoding-api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 86400, // 24h
              },
            },
          },
        ],
      },
    }),
  ],
});
