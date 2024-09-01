import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default ({mode}) => defineConfig({
    plugins: [vue()],
    base: './',
    publicPath: './',
    resolve: {
        dedupe: ['vue'],
        alias: {
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    define: {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
    },
    server: {
        host: '0.0.0.0',
        port: 2806
    }
})
