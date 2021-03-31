<template>
    <ALayout>
        <Header />
        <transition name="fade">
            <Content />
        </transition>
    </ALayout>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Header from './header/index.vue';
    import Content from './content/index.vue';

    export default defineComponent({
        components: {
            Header,
            Content
        },
        setup() {},
    });
</script>
