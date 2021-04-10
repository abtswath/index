<template>
    <ALayoutContent class="container">
        <RouterView></RouterView>
    </ALayoutContent>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        setup() {},
    });
</script>

<style lang="less" scoped>
    .container {
        min-height: calc(100vh - 70px);
        margin: 0 auto;
        padding-top: 64px;
        @media screen and (max-width: 600px) {
            min-height: calc(100vh - 70px - 64px);
            padding-top: 0;
        }
        @media screen and (max-width: 576px) {
            width: 100%;
        }
        @media screen and (min-width: 576px) {
            width: 540px;
        }
        @media screen and (min-width: 768px) {
            width: 720px;
        }
        @media screen and (min-width: 992px) {
            width: 960px;
        }
        @media screen and (min-width: 1200px) {
            width: 1140px;
        }
    }
</style>
