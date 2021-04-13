import { ConfigEnv, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteMockPlugin from './plugins/vite-plugin-mock';

const path = require('path');

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
    return {
        plugins: [
            vue(),
            viteMockPlugin({
                templatePath: './mock'
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true
                }
            }
        },
        define: {
            'process.env.TEST_IE': 'false'
        }
    };
};
