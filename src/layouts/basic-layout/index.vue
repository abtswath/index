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
    import { AccountService } from '@/services';

    export default defineComponent({
        components: {
            Header,
            Content,
            Footer
        },
        beforeRouteEnter(to, from, next) {
            AccountService.checkLogin()
                .then(() => {
                    next();
                })
                .catch(() => {
                    next({ name: 'login' });
                });
        },
        setup() {},
    });
</script>
