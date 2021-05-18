<template>
    <div class="full-height" style="position: relative;">
        <SearchBar />
        <div class="full-height">
            <textarea ref="textarea" />
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, SetupContext, onMounted } from 'vue';
    import 'codemirror/addon/scroll/simplescrollbars.css';
    import 'codemirror/addon/dialog/dialog.css';
    import 'codemirror/addon/search/matchesonscrollbar.css';
    import 'codemirror/addon/edit/continuelist';
    import 'codemirror/addon/edit/closebrackets';
    import 'codemirror/addon/scroll/simplescrollbars';
    import 'codemirror/addon/dialog/dialog';
    import 'codemirror/addon/search/searchcursor';
    import 'codemirror/addon/search/matchesonscrollbar';
    import 'codemirror/mode/javascript/javascript';
    import 'codemirror/mode/markdown/markdown';
    import 'codemirror/keymap/sublime';
    import CodeMirror, { EditorFromTextArea } from 'codemirror';
    import './themes/editor.less';
    import 'codemirror/lib/codemirror.css';
    import bindKeyboardShortcuts from './keyboard-shortcuts';
    import SearchBar from './dialog/search-bar';

    export default defineComponent({
        components: {
            SearchBar,
        },
        props: {
            value: {
                type: String,
                default: '',
            },
        },
        setup(props, ctx: SetupContext) {
            const textarea = ref();
            const codeMirror = ref<EditorFromTextArea>();

            onMounted(() => {
                codeMirror.value = CodeMirror.fromTextArea(textarea.value, {
                    lineNumbers: false,
                    mode: 'markdown',
                    scrollbarStyle: 'overlay',
                    lineWrapping: true,
                    theme: 'editor',
                    keyMap: 'sublime',
                    indentUnit: 4,
                    extraKeys: {
                        Enter: 'newlineAndIndentContinueMarkdownList',
                        Tab: (cm) => {
                            if (cm.somethingSelected()) {
                                cm.indentSelection('add');
                            } else {
                                cm.replaceSelection(
                                    cm.getOption('indentWithTabs')
                                        ? '\t'
                                        : Array(
                                              (cm.getOption('indentUnit') ??
                                                  0) + 1
                                          ).join(' '),
                                    'end'
                                );
                            }
                        },
                        ...bindKeyboardShortcuts(
                            codeMirror.value as CodeMirror.Editor
                        ),
                    },
                });
                codeMirror.value.setSize('100%', '100%');
                codeMirror.value.on('change', function (instance) {
                    ctx.emit('update:value', instance.getValue());
                });
                codeMirror.value.on('scroll', function () {
                    ctx.emit('scroll', 'editor');
                });
            });

            const getInstance = (): CodeMirror.Editor => {
                return codeMirror.value as CodeMirror.Editor;
            };

            return {
                textarea,
                getInstance,
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
