<template>
    <div class="search-bar">
        <input />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        setup() {},
    });
</script>

<style lang="less" scoped>
    .search-bar {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 99999;
        background: inherit;
        padding: 4px 8px;
        box-shadow: -2px 0 4px -2px rgba(0, 0, 0, .4), 0 5px 10px -5px rgba(0, 0, 0, .4);

        &::before {
            content: '';
            background: #03a9f4;
            position: absolute;
            top: 0;
            left: 0;
            width: 2px;
            height: 100%;
            display: block;
        }

        input {
            background: #fff;
        }
    }
</style>
