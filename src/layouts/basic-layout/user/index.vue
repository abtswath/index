<template>
    <div class="float-left">
        <ADropdown>
            <div class="flex-middle pointer">
                <AAvatar :size="36" style="display: block" class="mr-8">
                    <template #icon><UserOutlined /></template>
                </AAvatar>
                <span style="margin-right: 4px">
                    {{ info.username }}
                </span>
                <DownOutlined />
            </div>
            <template #overlay>
                <AMenu>
                    <template v-for="(item, index) in menu" :key="index">
                        <AMenuItem @click="item.event">
                            <component :is="item.icon" />
                            {{ item.label }}
                        </AMenuItem>
                    </template>
                </AMenu>
            </template>
        </ADropdown>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent } from 'vue';
    import {
        UserOutlined,
        DownOutlined,
        ProjectOutlined,
        FileTextOutlined,
        DesktopOutlined,
        LogoutOutlined,
    } from '@ant-design/icons-vue';
    import { useI18n } from 'vue-i18n';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';

    export default defineComponent({
        components: {
            UserOutlined,
            DownOutlined,
            ProjectOutlined,
            FileTextOutlined,
            DesktopOutlined,
            LogoutOutlined,
        },
        setup() {
            const { t } = useI18n();
            const router = useRouter();

            const store = useStore();

            const info = computed(() => store.getters['user/info']);
            const menu = computed(() => {
                return [
                    {
                        label: t('header.user.profile'),
                        icon: UserOutlined,
                        event: () => {
                            router.push({ name: 'user-setting' });
                        },
                    },
                    {
                        label: t('header.user.projects'),
                        icon: ProjectOutlined,
                        event: () => {},
                    },
                    {
                        label: t('header.user.articles'),
                        icon: FileTextOutlined,
                        event: () => {},
                    },
                    {
                        label: t('header.user.management'),
                        icon: DesktopOutlined,
                        event: () => {},
                    },
                    {
                        label: t('header.user.logout'),
                        icon: LogoutOutlined,
                        event: () => {},
                    },
                ];
            });

            return {
                menu,
                info,
            };
        },
    });
</script>

