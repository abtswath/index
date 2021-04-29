<template>
    <div class="p-16">
        <SimpleList :service="service">
            <template #title="{ item }">
                <RouterLink style="color: #1890ff" :to="{ name: 'articles' }">
                    {{ item.title }}
                </RouterLink>
            </template>
            <template #description="{ item }">
                {{ item.description }}
            </template>
            <template #extra="{ item }">
                <span class="mr-16">
                    <UserOutlined />
                    {{ item.author }}
                </span>
                <span>
                    <ClockCircleOutlined />
                    {{ item.lastUpdate }}
                </span>
            </template>
        </SimpleList>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons-vue';
    import { SimpleList } from '@/components';
    import { ArticleService } from '@/services';

    export default defineComponent({
        components: {
            SimpleList,
            UserOutlined,
            ClockCircleOutlined,
        },
        setup() {
            const { t } = useI18n();
            const service = ArticleService.getArticles;

            return {
                t,
                service,
            };
        },
    });
</script>
