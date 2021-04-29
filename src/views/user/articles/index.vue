<template>
    <APageHeader :back-icon="false" class="bb-1">
        <template #title> 我的文章 </template>
        <template #extra>
            <AButton type="primary" @click="addArticle">
                <PlusOutlined />
                添加文章
            </AButton>
        </template>
    </APageHeader>
    <div class="p-16">
        <SimpleList class="articles" :service="service">
            <template #title="{ item }">
                <RouterLink style="color: #1890ff" :to="{ name: 'articles' }">
                    {{ item.title }}
                </RouterLink>
            </template>
            <template #description="{ item }">
                {{ item.description }}
            </template>
            <template #extra="{ item }">
                <span class="mr-8">
                    <ClockCircleOutlined />
                    {{ item.lastUpdate }}
                </span>
                <AButton type="link" size="small">
                    <FormOutlined />
                    编辑
                </AButton>
                <AButton type="link" size="small">
                    <DeleteOutlined />
                    删除
                </AButton>
                <AButton type="link" size="small">
                    <SettingOutlined />
                    设置
                </AButton>
            </template>
        </SimpleList>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useI18n } from 'vue-i18n';
    import {
        PlusOutlined,
        ClockCircleOutlined,
        FormOutlined,
        DeleteOutlined,
        SettingOutlined,
    } from '@ant-design/icons-vue';
    import { SimpleList } from '@/components';
    import { ArticleService } from '@/services';
    import { useRouter } from 'vue-router';

    export default defineComponent({
        components: {
            SimpleList,
            PlusOutlined,
            ClockCircleOutlined,
            FormOutlined,
            DeleteOutlined,
            SettingOutlined,
        },
        setup() {
            const { t } = useI18n();

            const service = ArticleService.getArticles;
            const router = useRouter();

            const addArticle = () => {
                router.push({ name: 'user-articles-add' });
            };

            return {
                t,
                service,
                addArticle,
            };
        },
    });
</script>
