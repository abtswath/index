<template>
    <ALayoutHeader class="header">
        <Logo />
        <Menu class="menu-hide" />
        <Search class="search-hide" />
        <div class="float-right">
            <I18n class="i18n-hide" />
            <User />
        </div>
    </ALayoutHeader>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Logo from '../logo/index.vue';
    import Menu from '../menu/index.vue';
    import Search from '../search/index.vue';
    import I18n from '../i18n/index.vue';
    import User from '../user/index.vue';

    export default defineComponent({
        components: {
            Logo,
            Menu,
            Search,
            I18n,
            User,
        },
        setup() {},
    });
</script>

<style lang="less" scoped>
    .header {
        background: #fff;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99;
        width: 100%;
        @media screen and (max-width: 800px) {
            .search-hide {
                display: none;
            }
        }
        @media screen and (max-width: 600px) {
            position: static;
            padding: 0 16px !important;
            .menu-hide,
            .i18n-hide {
                display: none;
            }
        }
    }
</style>
