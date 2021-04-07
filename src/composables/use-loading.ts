import { Ref, ref, UnwrapRef } from 'vue';

const useLoading = <T>(
    promise: (...args: any[]) => Promise<T>
): {
    loading: Ref<UnwrapRef<boolean>>;
    task: (...args: any[]) => Promise<T>;
} => {
    const loading = ref(false);

    const task = (...args: any[]) => {
        return new Promise<T>(async (resolve, reject) => {
            loading.value = true;
            promise(...args)
                .then((...result) => {
                    resolve(...result);
                })
                .catch((...errors) => {
                    reject(...errors);
                })
                .finally(() => {
                    loading.value = false;
                });
        });
    };

    return {
        loading,
        task
    };
};

export default useLoading;
