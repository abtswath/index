<template>
    <ALayoutFooter class="footer text-center">
        <a target="_blank" href="https://github.com/Great233/index">Github</a>
        <span class="mr-8 ml-8">·</span>
        <a target="_blank" href="https://gitee.com/great233/index">Gitee</a>
    </ALayoutFooter>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        setup() {},
    });
</script>

<style lang="less" scoped>
    .footer {
        border-top: 1px solid #d9d9d9;
        a {
            color: #1d3557;
            &:hover {
                color: #1890ff;
            }
        }
    }
</style>
