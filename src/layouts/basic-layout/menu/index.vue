<template>
    <div :style="{ float: 'left' }">
        <AMenu class="menu" mode="horizontal" :selected-keys="[selectedKey]">
            <AMenuItem v-for="item in menu" :key="item.key">
                <router-link :to="item.to">{{ item.label }}</router-link>
            </AMenuItem>
        </AMenu>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        setup() {},
        data() {
            return {
                selectedKey: "home",
            };
        },
        computed: {
            menu() {
                return [
                    {
                        label: this.$t("header.menu.home"),
                        key: "home",
                        to: {
                            name: "home",
                        },
                    },
                    {
                        label: this.$t("header.menu.articles"),
                        key: "articles",
                        to: {
                            name: "articles",
                        },
                    },
                    {
                        label: this.$t("header.menu.projects"),
                        key: "projects",
                        to: {
                            name: "projects",
                        },
                    },
                ];
            },
        },
        watch: {
            $route() {
                this.selectedKey = this.$route.name
                    ? this.$route.name.toString()
                    : "";
            },
        },
    });
</script>

<style lang="sass" scoped>
.menu
    height: 64px
    padding: 8px 0
    margin: 0 24px
</style>
