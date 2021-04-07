<template>
    <ALayout>
        <Header />
        <transition name="fade">
            <Content />
        </transition>
    </ALayout>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Header from './header/index.vue';
    import Content from './content/index.vue';
    import { AccountService } from '@/services';

    export default defineComponent({
        components: {
            Header,
            Content,
        },
        beforeRouteEnter(to, from, next) {
            AccountService.checkLogin()
                .then(() => {
                    next({ name: 'login' });
                })
                .catch(() => {});
        },
        setup() {},
    });
</script>
