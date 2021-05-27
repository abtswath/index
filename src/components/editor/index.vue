<template>
    <ARow class="full-height">
        <ACol :span="12" class="full-height">
            <Editor
                ref="editor"
                @mouseover="setMouseOn(mouseLocation.editor)"
                @mouseleave="setMouseOn(mouseLocation.unknown)"
                v-model:value="content"
                @on-scroll="editorScroll"
            />
        </ACol>
        <ACol :span="12" class="full-height overflow-hidden">
            <div
                @mouseover="setMouseOn(mouseLocation.viewer)"
                @mouseleave="setMouseOn(mouseLocation.unknown)"
                @scroll="viewerScroll"
                ref="viewer"
                class="viewer full-height overflow-y-auto"
                v-html="html"
            />
        </ACol>
    </ARow>
</template>

<script lang="ts">
    import './store';
    import { defineComponent, ref, watchEffect } from 'vue';
    import Editor from './editor.vue';
    import MarkdownIt from 'markdown-it';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/atom-one-dark.css';
    import './themes/viewer.less';
    import './highlight.js';

    enum MouseLocation {
        editor = 'editor',
        viewer = 'viewer',
        unknown = 'unknown',
    }

    export default defineComponent({
        components: {
            Editor,
        },
        setup() {
            const content = ref<string>('');
            const html = ref<string>('');
            const viewer = ref<HTMLElement>();
            const editor = ref();

            const md: MarkdownIt = new MarkdownIt({
                highlight: (str, lang) => {
                    if (!lang || !hljs.getLanguage(lang)) {
                        lang = 'bash';
                    }
                    return `<pre class="g-index"><code class="hljs">${
                        hljs.highlight(lang, str, true).value
                    }</code></pre>`;
                },
            });

            watchEffect(
                () => {
                    html.value = md.render(content.value);
                },
                {
                    flush: 'pre',
                }
            );

            let mouseLocation: MouseLocation;

            const mouseOn = (location: MouseLocation) => {
                return mouseLocation === location;
            };

            const setMouseOn = (location: MouseLocation) => {
                mouseLocation = location;
            };

            const editorScroll = (pos: number) => {
                if (!mouseOn(MouseLocation.editor)) {
                    return;
                }
                const element = viewer.value as HTMLElement;
                element.scrollTo(0, element.scrollHeight * pos);
            };

            const viewerScroll = () => {
                if (!mouseOn(MouseLocation.viewer)) {
                    return;
                }
                const element = viewer.value as HTMLElement;
                editor.value.scrollTo(element.scrollTop / element.scrollHeight);
            };

            return {
                content,
                html,
                viewer,
                editor,
                setMouseOn,
                viewerScroll,
                editorScroll,
                mouseLocation: MouseLocation,
            };
        },
    });
</script>

<style lang="less" scoped>
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: #bcd;
    }
</style>
