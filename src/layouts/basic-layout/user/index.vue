<template>
    <div style="float: left;">
        <ADropdown>
            <div style="display: flex; align-items: center; cursor: pointer">
                <AAvatar :size="36" style="display: block; margin-right: 8px">
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
    import { defineComponent } from "vue";
    import { UserOutlined, DownOutlined, ProjectOutlined, FileTextOutlined, DesktopOutlined, LogoutOutlined } from "@ant-design/icons-vue";

    export default defineComponent({
        components: {
            UserOutlined,
            DownOutlined,
            ProjectOutlined,
            FileTextOutlined,
            DesktopOutlined,
            LogoutOutlined
        },
        setup() {},
        data() {
            return {
                menu: [
                    {
                        label: "个人中心",
                        icon: UserOutlined,
                        event: () => {},
                    },
                    {
                        label: "我的项目",
                        icon: ProjectOutlined,
                        event: () => {},
                    },
                    {
                        label: "我的文章",
                        icon: FileTextOutlined,
                        event: () => {},
                    },
                    {
                        label: "管理后台",
                        icon: DesktopOutlined,
                        event: () => {},
                    },
                    {
                        label: "退出登录",
                        icon: LogoutOutlined,
                        event: () => {},
                    },
                ],
            };
        },
    });
</script>

