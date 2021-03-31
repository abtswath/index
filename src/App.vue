<template>
    <RouterView></RouterView>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import { useStore } from "vuex";

    export default defineComponent({
        name: "App",
        setup() {
            const store = useStore();
            store.dispatch("i18n/initializeLocale");
        },
    });
</script>

<style>
</style>