<template>
    <ALayoutHeader :style="{ background: '#fff' }">
        <Logo />
        <Menu />
        <Search />
        <div style="float: right">
            <I18n />
            <User />
        </div>
    </ALayoutHeader>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Logo from "../logo/index.vue";
    import Menu from "../menu/index.vue";
    import Search from "../search/index.vue";
    import I18n from "../i18n/index.vue";
    import User from "../user/index.vue";

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
