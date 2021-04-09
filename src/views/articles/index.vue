<template>
    <div class="p-16">
        <AList
            item-layout="vertical"
            :data-source="articles"
            :loading="loading"
            class="article-list"
            :pagination="pagination"
        >
            <template #renderItem="{ item }">
                <AListItem>
                    <AListItemMeta class="mb-8">
                        <template #title class="mb-8">
                            <RouterLink
                                style="color: #1890ff"
                                :to="{ name: 'articles' }"
                            >
                                {{ item.title }}
                            </RouterLink>
                        </template>
                        <template #description>
                            {{ item.description }}
                        </template>
                    </AListItemMeta>
                    <div style="color: #495057">
                        <span class="mr-16">{{ item.author }}</span>
                        <span>{{ item.lastUpdate }}</span>
                    </div>
                </AListItem>
            </template>
        </AList>
    </div>
</template>

<script lang="ts">
    import { useLoading, usePagination } from '@/composables';
    import { Article, ArticleService, Pagination, Response } from '@/services';
    import { defineComponent, ref, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';

    export default defineComponent({
        setup() {
            const { t } = useI18n();
            const articles = ref<Article[]>([]);

            const { loading, task } = useLoading<Response<Pagination<Article>>>(
                ArticleService.getArticles
            );

            const pagination = usePagination();

            watchEffect(() => {
                task(pagination.current)
                    .then((response) => {
                        pagination.total = response.data.total;
                        articles.value = response.data.list;
                    })
                    .catch(() => {});
            });

            return {
                articles,
                loading,
                t,
                pagination,
            };
        },
    });
</script>

<style lang="less" scoped>
    .article-list {
        white-space: normal;
        word-break: break-word;
        .ant-list-item {
            border-bottom: 1px solid #d9d9d9;
        }
    }
</style>
