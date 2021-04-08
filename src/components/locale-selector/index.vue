<template>
    <ADropdown>
        <GlobalOutlined
            class="pointer"
            style="font-size: 24px; line-height: 64px"
        />
        <template #overlay>
            <AMenu>
                <AMenuItem
                    v-for="(item, index) in locales"
                    :key="index"
                    @click="changeLocale(item.locale)"
                >
                    {{ item.label }}
                </AMenuItem>
            </AMenu>
        </template>
    </ADropdown>
</template>


<script lang="ts">
    import { defineComponent } from 'vue';
    import { useStore } from 'vuex';
    import { Locale } from 'vue-i18n';
    import { GlobalOutlined } from '@ant-design/icons-vue';

    export default defineComponent({
        components: {
            GlobalOutlined,
        },
        setup() {
            const store = useStore();

            const locales = [
                {
                    locale: 'zh-CN',
                    label: '中文',
                },
                {
                    locale: 'en-US',
                    label: 'English',
                },
            ];

            const changeLocale = (locale: Locale) => {
                store.dispatch('i18n/setLocale', locale);
            };
            return {
                locales,
                changeLocale,
            };
        },
    });
</script>
