<template>
    <div
        class="full-height"
        style="position: relative"
        @keydown.esc="closeDialog"
    >
        <SearchBar :editor="editor" />
        <TableDialog :editor="editor" />
        <LinkDialog :editor="editor" />
        <div class="full-height" ref="textarea"></div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, SetupContext, onMounted } from 'vue';
    import { SearchBar, TableDialog, LinkDialog } from './dialog';
    import Editor from './editor';
    import store from './store';

    export default defineComponent({
        components: {
            SearchBar,
            TableDialog,
            LinkDialog,
        },
        props: {
            value: {
                type: String,
                default: '',
            },
        },
        emits: ['on-scroll', 'update:value'],
        setup(props, ctx: SetupContext) {
            const textarea = ref();

            const editor = ref<Editor>();
            onMounted(() => {
                editor.value = new Editor(textarea.value, props.value);
                editor.value.onChange = (content) => {
                    ctx.emit('update:value', content);
                };
                editor.value.onScroll = (view) => {
                    ctx.emit(
                        'on-scroll',
                        view.scrollDOM.scrollTop / view.scrollDOM.scrollHeight
                    );
                };
            });

            const closeDialog = () => {
                store.dispatch('closeDialog');
                editor.value?.getCm().focus();
            };

            const scrollTo = (pos: number) => {
                editor.value?.scrollTo(pos);
            };

            return {
                textarea,
                closeDialog,
                scrollTo,
                editor,
            };
        },
    });
</script>

<style lang="less">
    .editor-textarea {
        width: 100%;
    }
    [class^='ant-'],
    [class*='ant-'],
    [class^='ant-'] *,
    [class*='ant-'] *,
    [class^='ant-'] *::before,
    [class*='ant-'] *::before,
    [class^='ant-'] *::after,
    [class*='ant-'] *::after {
        box-sizing: content-box !important;
    }
</style>
