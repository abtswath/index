<template>
    <AModal
        title="添加链接"
        :width="500"
        v-model:visible="visible"
        ok-text="确定"
        cancel-text="取消"
        @ok="insertLink"
        size="small"
    >
        <AForm :colon="false" :model="form" @keydown.enter="insertLink">
            <AFormItem v-bind="validateInfos.link" label="链接地址">
                <AInput
                    class="editor-dialog-link-input"
                    placeholder="请输入链接地址"
                    ref="input"
                    @blur="validate('link').catch(() => {})"
                    v-model:value="form.link"
                />
            </AFormItem>
        </AForm>
    </AModal>
</template>

<script lang="ts">
    import { computed, defineComponent, nextTick, reactive, ref } from 'vue';
    import store from '../../store';
    import { useForm } from '@ant-design-vue/use';
    import { EditorInstanceMixin, ToolBarProps } from '../../mixins';

    export default defineComponent({
        mixins: [EditorInstanceMixin],
        setup(props: ToolBarProps) {
            const form = reactive({
                link: '',
            });

            const input = ref();

            const rules = reactive({
                link: [{ required: true, message: '' }],
            });

            const visible = computed({
                get: () => {
                    const status = store.getters['linkDialogStatus'];
                    if (status) {
                        resetFields();
                        nextTick(() => {
                            input.value?.focus();
                        });
                    }
                    return status;
                },
                set: (value) => {
                    store.dispatch('switchLinkDialog', value);
                },
            });

            const { validate, validateInfos, resetFields } = useForm(
                form,
                rules
            );

            const insertLink = () => {
                validate()
                    .then(() => {
                        visible.value = false;
                        let url = form.link;
                        const replaceValue = `[${props.editor.getSelection()}](${url})`;
                        props.editor.replaceSelection(
                            replaceValue,
                            -(replaceValue.length - 1)
                        );
                        // TODO. 没有 timeout 情况下不知道为什么，会多个换行
                        setTimeout(() => {
                            props.editor.focus();
                        }, 10);
                    })
                    .catch(() => {});
            };

            return {
                input,
                visible,
                insertLink,
                form,
                rules,
                validateInfos,
                validate,
            };
        },
    });
</script>

<style lang="less" scoped>
    .editor-dialog-link-input {
        max-width: 90%;
        width: 350px;
    }
</style>
