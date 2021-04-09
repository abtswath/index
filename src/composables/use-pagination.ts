import { reactive, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// TODO. customize pagination config
const usePagination = () => {
    const route = useRoute();
    const router = useRouter();

    const paginationConfig = reactive({
        current: 1,
        hideOnSinglePage: true,
        showQuickJumper: true,
        total: 0,
        onChange: (page: number) => {
            router.push({
                query: {
                    page
                }
            });
        }
    });
    watchEffect(() => {
        const queryPage = Number(route.query.page);
        const currentPage = queryPage > 1 ? queryPage : 1;
        paginationConfig.current = currentPage;
    });

    return paginationConfig;
};

export default usePagination;
