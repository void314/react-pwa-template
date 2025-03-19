import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { env } from 'process';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

let faviconURL = '/icon.svg';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            includeAssets: [faviconURL],
            registerType: 'autoUpdate',
            mode: 'development',
            minify: false,
            strategies: 'generateSW',
            filename: 'sw.js',
            selfDestroying: true,
            workbox: {
                globPatterns: ['**/*.{js,css,html}'],
                globIgnores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/public/**', '**/src/**'],
                offlineGoogleAnalytics: false,
            },
            devOptions: {
                enabled: true,
                type: 'module',
            },
            manifest: {
                theme_color: '#ffffff',
                icons: [
                    {
                        src: faviconURL,
                        sizes: '512x512',
                        type: 'image/svg+xml',
                        purpose: 'any maskable',
                    },
                    {
                        src: faviconURL,
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
