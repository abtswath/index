<template>
    <ASpin :spinning="loading">
        <div class="p-16">
            <AList
                :grid="{
                    gutter: 16,
                }"
                :data-source="projects"
                :pagination="pagination"
            >
                <template #renderItem="{ item }">
                    <AListItem>
                        <ACard
                            class="project-card"
                            :bordered="false"
                            :body-style="{ padding: '8px' }"
                        >
                            <template #cover>
                                <RouterLink
                                    :to="{
                                        name: 'home',
                                        params: { id: item.id },
                                    }"
                                >
                                    <div
                                        class="project-card__cover"
                                        style="background: #ced4da"
                                    ></div>
                                </RouterLink>
                            </template>
                            <ACardMeta>
                                <template #title>
                                    <RouterLink
                                        class="project-card__title"
                                        :to="{
                                            name: 'home',
                                            params: { id: item.id },
                                        }"
                                    >
                                        {{ item.title }}
                                    </RouterLink>
                                </template>
                                <template #description>
                                    {{ t('home.project.author') }}：
                                    <span>{{ item.author }}</span>
                                </template>
                            </ACardMeta>
                        </ACard>
                    </AListItem>
                </template>
            </AList>
        </div>
    </ASpin>
</template>

<script lang="ts">
    import { useLoading, usePagination } from '@/composables';
    import { Pagination, Project, ProjectService, Response } from '@/services';
    import { defineComponent, ref, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';

    export default defineComponent({
        setup() {
            const { t } = useI18n();
            const projects = ref<Project[]>([]);

            const pagination = usePagination();

            const { loading, task } = useLoading<Response<Pagination<Project>>>(
                ProjectService.getProjects
            );
            watchEffect(() => {
                task(pagination.current)
                    .then((response) => {
                        pagination.total = response.data.total;
                        projects.value = response.data.list;
                    })
                    .catch(() => {});
            });

            return {
                projects,
                loading,
                pagination,
                t,
            };
        },
    });
</script>

<style lang="less" scoped>
    .ant-col {
        @media screen and (max-width: 576px) {
            width: 50%;
            .project-card__cover {
                height: 190px;
            }
        }
        @media screen and (min-width: 576px) {
            width: 33.333333%;
            .project-card__cover {
                height: 190px;
            }
        }
        @media screen and (min-width: 768px) {
            width: 25%;
            .project-card__cover {
                height: 190px;
            }
        }
        @media screen and (min-width: 992px) {
            width: 20%;
            .project-card__cover {
                height: 210px;
            }
        }
        @media screen and (min-width: 1200px) {
            width: 16.6666666%;
            .project-card__cover {
                height: 210px;
            }
        }
        .project-card {
            &__cover {
                width: 100%;
            }
            &__title {
                color: rgba(0, 0, 0, 0.85);
            }
        }
    }
</style>
