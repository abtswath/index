<template>
    <div :style="{ float: 'left' }">
        <AInputSearch
            v-model="keyword"
            :placeholder="$t('header.searchInputPlaceholder')"
            style="width: 200px"
            @search="onSearch"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        data() {
            return {
                keyword: "",
            };
        },
        methods: {
            onSearch(value: string) {
                this.$router.push({
                    query: {
                        q: value
                    }
                })
            }
        },
    });
</script>

