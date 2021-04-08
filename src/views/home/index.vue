<template>
    <ASpin :spinning="loading">
        <div style="padding: 16px">
            <template v-for="(item, index) in projects" :key="index">
                <div class="pl-8 pr-8 mb-16 mt-16 float-left project-item">
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
                </div>
            </template>
            <div style="clear: both"></div>
        </div>
    </ASpin>
</template>

<script lang="ts">
    import { useLoading } from '@/composables';
    import { Project, ProjectService, Response } from '@/services';
    import { defineComponent, reactive } from 'vue';
    import { useI18n } from 'vue-i18n';

    export default defineComponent({
        setup() {
            const { t } = useI18n();
            const projects = reactive<Project[]>([]);

            const { loading, task } = useLoading<Response<Project[]>>(
                ProjectService.getProjects
            );
            task()
                .then((response) => {
                    response.data.forEach((item) => {
                        projects.push(item);
                    });
                })
                .catch(() => {});

            return {
                projects,
                loading,
                t,
            };
        },
    });
</script>

<style lang="less" scoped>
    .project-item {
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
