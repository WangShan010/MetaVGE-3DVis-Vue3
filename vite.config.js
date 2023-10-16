import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default ({mode}) => defineConfig({
    plugins: [vue()],
    base: './',
    publicPath: './',
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
        port: 2805
    }
})
