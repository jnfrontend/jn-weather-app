// @ts-check
import { defineConfig } from 'astro/config';

const GH_LIVE_URL = 'https://jnfrontend.github.io';
const GH_PAGE_NAME = 'jn-weather-app';

// https://astro.build/config
export default defineConfig({
    site: GH_LIVE_URL,
    base: GH_PAGE_NAME,
});
