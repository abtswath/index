<template>
    <div class="float-left">
        <ADropdown>
            <div class="flex-middle pointer">
                <AAvatar :size="36" style="display: block" class="mr-8">
                    <template #icon><UserOutlined /></template>
                </AAvatar>
                <span style="margin-right: 4px">admin</span>
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
    import { defineComponent } from 'vue';
    import {
        UserOutlined,
        DownOutlined,
        ProjectOutlined,
        FileTextOutlined,
        DesktopOutlined,
        LogoutOutlined,
    } from '@ant-design/icons-vue';

    export default defineComponent({
        components: {
            UserOutlined,
            DownOutlined,
            ProjectOutlined,
            FileTextOutlined,
            DesktopOutlined,
            LogoutOutlined,
        },
        setup() {},
        data() {
            return {};
        },
        computed: {
            menu() {
                return [
                    {
                        label: this.$t('header.user.profile'),
                        icon: UserOutlined,
                        event: () => {},
                    },
                    {
                        label: this.$t('header.user.projects'),
                        icon: ProjectOutlined,
                        event: () => {},
                    },
                    {
                        label: this.$t('header.user.articles'),
                        icon: FileTextOutlined,
                        event: () => {},
                    },
                    {
                        label: this.$t('header.user.management'),
                        icon: DesktopOutlined,
                        event: () => {},
                    },
                    {
                        label: this.$t('header.user.logout'),
                        icon: LogoutOutlined,
                        event: () => {},
                    },
                ];
            },
        },
    });
</script>

