<template>
    <div class="editor">
        <Editor />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { Editor } from '@/components';

    export default defineComponent({
        components: {
            Editor,
        },
        setup() {},
    });
</script>

<style lang="less" scoped>
    .editor {
        height: 100vh;
    }
</style>
