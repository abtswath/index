<template>
    <div class="float-left">
        <AMenu
            class="menu pt-8 pb-8"
            mode="horizontal"
            :selected-keys="[selectedKey]"
        >
            <AMenuItem v-for="item in menu" :key="item.key">
                <router-link :to="item.to">{{ item.label }}</router-link>
            </AMenuItem>
        </AMenu>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, ref, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRoute } from 'vue-router';

    export default defineComponent({
        setup() {
            const route = useRoute();

            const { t } = useI18n();

            const menu = computed(() => {
                return [
                    {
                        label: t('header.menu.home'),
                        key: 'home',
                        to: {
                            name: 'home',
                        },
                    },
                    {
                        label: t('header.menu.articles'),
                        key: 'articles',
                        to: {
                            name: 'articles',
                        },
                    },
                    {
                        label: t('header.menu.projects'),
                        key: 'projects',
                        to: {
                            name: 'projects',
                        },
                    },
                ];
            });

            const selectedKey = ref('home');

            watchEffect(() => {
                selectedKey.value = route.name?.toString() || 'home';
            });

            return {
                menu,
                selectedKey,
            };
        },
    });
</script>

<style lang="less" scoped>
    .menu {
        height: 64px;
        margin: 0 24px;
    }
</style>
