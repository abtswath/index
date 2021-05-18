import { ConfigEnv, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import mock from './plugins/vite-plugin-mock';
import html from 'vite-plugin-html';

const path = require('path');

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
    return {
        plugins: [
            vue(),
            mock({
                templatePath: './mock'
            }),
            html({
                minify: true,
                inject: {
                    injectData: {
                        title: 'INDEX'
                    }
                }
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
