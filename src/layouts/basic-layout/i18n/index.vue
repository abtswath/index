<template>
    <div style="float: left; margin-right: 16px">
        <AButton @click="changeLocale">
            {{ currentLocaleLabel }}
        </AButton>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import { mapState } from "vuex";

    export default defineComponent({
        data() {
            return {
                locales: {
                    zh: {
                        label: "English",
                    },
                    en: {
                        label: "中文",
                    },
                },
            };
        },
        computed: {
            ...mapState("i18n", ["locale"]),
            currentLocaleLabel() {
                return this.locale === 'zh-CN' ? 'English' : '中文';
            }
        },
        methods: {
            changeLocale() {
                let locale = "en-US";
                if (this.locale === "en-US") {
                    locale = "zh-CN";
                }
                this.$store.dispatch("i18n/setLocale", locale);
            },
        },
    });
</script>
