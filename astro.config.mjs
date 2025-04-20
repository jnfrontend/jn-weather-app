// @ts-check
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    env: {
    schema: {
      OPEN_WEATHER_API_URL: envField.string({ context: "client", access: "public" }),
      OPEN_WEATHER_API_KEY: envField.string({ context: "client", access: "public" })
    }
  }
});
