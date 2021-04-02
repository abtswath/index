<template>
    <div class="float-left mr-16">
        <LocaleSelector />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { LocaleSelector } from '@/components';

    export default defineComponent({
        components: {
            LocaleSelector,
        },
    });
</script>
