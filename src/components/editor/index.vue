<template>
    <ARow class="full-height">
        <ACol :span="12" class="full-height" @mouseover="setMouseOn('editor')">
            <Editor
                ref="editor"
                v-model:value="content"
                @scroll="handleScroll"
            />
        </ACol>
        <ACol
            :span="12"
            class="full-height overflow-hidden"
            @mouseover="setMouseOn('viewer')"
        >
            <div
                @scroll="handleScroll('viewer')"
                ref="viewer"
                class="viewer full-height overflow-y-auto"
                v-html="html"
            />
        </ACol>
    </ARow>
</template>

<script lang="ts">
    import { defineComponent, ref, watchEffect } from 'vue';
    import Editor from './editor.vue';
    import MarkdownIt from 'markdown-it';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/atom-one-dark.css';
    import './viewer.less';
    import './highlight.js';

    enum MouseLocation {
        editor = 'editor',
        viewer = 'viewer',
    }

    export default defineComponent({
        components: {
            Editor,
        },
        setup() {
            const content = ref<string>('');
            const html = ref<string>('');
            const editor = ref<typeof Editor>();
            const viewer = ref<HTMLElement>();

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

            const handleScroll = () => {
                const element = viewer.value as HTMLElement;
                const cm = editor.value?.getInstance();
                const { top, height } = cm.getScrollInfo();
                if (mouseOn(MouseLocation.editor)) {
                    element.scrollTo({
                        top: element.scrollHeight * (top / height),
                    });
                } else {
                    cm.scrollTo(
                        0,
                        height * (element.scrollTop / element.scrollHeight)
                    );
                }
            };

            return {
                content,
                html,
                handleScroll,
                viewer,
                editor,
                setMouseOn,
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
