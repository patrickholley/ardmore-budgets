import {defineConfig} from "vite";
import * as path from "node:path";

export default defineConfig({
    build: {
        outDir: 'dist'
    },
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@store': path.resolve(__dirname, './src/store'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@templates': path.resolve(__dirname, './src/templates'),
            '@app-types': path.resolve(__dirname, './src/types'),
            '@utils': path.resolve(__dirname, './src/utils')
        },
    }
});
