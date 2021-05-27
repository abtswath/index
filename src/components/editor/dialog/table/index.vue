<template>
    <AModal
        title="添加表格"
        :width="340"
        v-model:visible="visible"
        ok-text="确定"
        cancel-text="取消"
        @ok="insertTable"
    >
        <AForm layout="inline" :colon="false" :model="form">
            <AFormItem v-bind="validateInfos.row" name="row" label="行">
                <AInputNumber
                    @blur="validate('row').catch(() => {})"
                    v-model:value.number="form.row"
                    ref="input"
                    :min="2"
                    :max="10"
                    :step="1"
                />
            </AFormItem>
            <AFormItem v-bind="validateInfos.col" name="col" label="列">
                <AInputNumber
                    @blur="validate('col').catch(() => {})"
                    v-model:value.number="form.col"
                    :min="1"
                    :max="10"
                    :step="1"
                />
            </AFormItem>
        </AForm>
    </AModal>
</template>

<script lang="ts">
    import { computed, defineComponent, reactive, ref } from 'vue';
    import store from '../../store';
    import { useForm } from '@ant-design-vue/use';
    import { EditorInstanceMixin, ToolBarProps } from '../../mixins';

    export default defineComponent({
        mixins: [EditorInstanceMixin],
        setup(props: ToolBarProps) {
            const form = reactive({
                row: 2,
                col: 1,
            });

            const input = ref();

            const rules = reactive({
                row: [
                    { required: true, message: '', type: 'number' },
                    { max: 10, min: 2, message: '', type: 'number' },
                ],
                col: [
                    { required: true, message: '', type: 'number' },
                    { max: 10, min: 1, message: '', type: 'number' },
                ],
            });

            const visible = computed({
                get: () => {
                    const status = store.getters['tableDialogStatus'];
                    if (status) {
                        input.value?.focus();
                    }
                    return status;
                },
                set: (value) => {
                    store.dispatch('switchTableDialog', value);
                },
            });

            const { validate, validateInfos } = useForm(form, rules);

            const insertTable = () => {
                validate()
                    .then(() => {
                        visible.value = false;
                        const tableStr = buildTable();
                        props.editor.replaceSelection(tableStr, -(tableStr.length - 7));
                        props.editor.focus();
                    })
                    .catch(() => {});
            };

            const buildTable = (): string => {
                let tableChar = props.editor.wrapper;
                for (let i = 0; i <= form.row; i++) {
                    tableChar += buildRow(i, form.col) + props.editor.wrapper;
                }
                return tableChar;
            };

            const buildRow = (rowIndex: number, col: number) => {
                const separator = rowIndex === 1 ? ' --- ' : '     ';
                const cols = [];
                const border = '|';
                for (let i = 0; i <= col; i++) {
                    cols.push(border);
                }
                return cols.join(separator);
            };

            return {
                input,
                visible,
                insertTable,
                form,
                rules,
                validateInfos,
                validate,
            };
        },
    });
</script>
