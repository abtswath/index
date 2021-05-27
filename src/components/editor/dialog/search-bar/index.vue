<template>
    <div class="search-bar" v-if="show">
        <div class="search-bar-input">
            <input ref="input" />
        </div>
        <div class="search-bar-action">
            <button disabled class="search-bar-action__prev"></button>
            <button disabled class="search-bar-action__next"></button>
            <button @click="close" class="search-bar-action__close"></button>
        </div>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, ref } from 'vue';
    import store from '../../store';
    import './index.less';

    export default defineComponent({
        setup() {
            const input = ref<HTMLInputElement>();

            const show = computed(() => {
                const state = store.getters['searchBarStatus'];
                if (state) {
                    input.value?.focus();
                }
                return state;
            });

            return {
                show,
                input,
            };
        },
    });
</script>
