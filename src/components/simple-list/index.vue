<template>
    <AList
        item-layout="vertical"
        :data-source="list"
        :loading="loading"
        class="simple-list"
        :pagination="pagination"
    >
        <template #renderItem="{ item }">
            <AListItem>
                <AListItemMeta class="mb-8">
                    <template #title class="mb-8">
                        <slot name="title" :item="item"></slot>
                    </template>
                    <template #description>
                        <slot name="description" :item="item"></slot>
                    </template>
                </AListItemMeta>
                <div class="simple-list__item-extra">
                    <slot name="extra" :item="item"></slot>
                </div>
            </AListItem>
        </template>
    </AList>
</template>

<script lang="ts">
    import { useLoading, usePagination } from '@/composables';
    import { Pagination, Response } from '@/services';
    import { defineComponent, ref, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';

    export default defineComponent({
        props: {
            service: {
                type: (Function as unknown) as () => (
                    ...args: any[]
                ) => Promise<Response<Pagination<any>>>,
                required: true,
            },
        },
        setup(props) {
            const { t } = useI18n();
            const list = ref<any[]>([]);

            const { loading, task } = useLoading<Response<Pagination<any>>>(
                props.service
            );

            const pagination = usePagination();

            watchEffect(() => {
                task(pagination.current)
                    .then((response) => {
                        pagination.total = response.data.total;
                        list.value = response.data.list;
                    })
                    .catch(() => {});
            });

            return {
                list,
                loading,
                t,
                pagination,
            };
        },
    });
</script>

<style lang="less">
    .simple-list {
        white-space: normal;
        word-break: break-word;
        .ant-list-item {
            border-bottom: 1px solid #d9d9d9;
            .simple-list__item-extra {
                color: rgba(0, 0, 0, 0.5);
                font-size: 0.8em;
                .ant-btn-link {
                    color: rgba(0, 0, 0, 0.5);
                    font-size: 0.8em;
                }
            }
        }
    }
</style>