<template>
    <div :style="{ float: 'left' }">
        <AInputSearch
            v-model="keyword"
            :placeholder="t('header.searchInputPlaceholder')"
            style="width: 200px"
            @search="handleSearch"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useRouter } from 'vue-router';

    export default defineComponent({
        setup() {
            const { t } = useI18n();

            const keyword = ref('');

            const router = useRouter();

            const handleSearch = (value: string) => {
                router.push({
                    name: 'search',
                    query: {
                        q: value,
                    },
                });
            };

            return {
                t,
                keyword,
                handleSearch,
            };
        },
    });
</script>

