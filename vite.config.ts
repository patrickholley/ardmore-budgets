import {defineConfig} from "vite";
import * as path from "node:path";
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    css: {
        postcss: {

        }
    },
    resolve: {
        alias: {
            // map from tsconfig.json, perhaps
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@store': path.resolve(__dirname, './src/store'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@templates': path.resolve(__dirname, './src/templates'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@html': path.resolve(__dirname, './src/html')
        },
    },
    assetsInclude: ['**/*.html']
});
