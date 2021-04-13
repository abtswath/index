<template>
    <ALayout>
        <Header />
        <transition name="fade">
            <Content />
        </transition>
        <Footer />
    </ALayout>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Header from './header/index.vue';
    import Content from './content/index.vue';
    import Footer from './footer/index.vue';

    export default defineComponent({
        components: {
            Header,
            Content,
            Footer
        },
        setup() {},
    });
</script>
