<template>
    <div class="languages">
        <LocaleSelector />
    </div>
    <div class="login-brand">
        <h1 class="text-center mb-0">INDEX</h1>
    </div>
    <ACard
        :title="t('account.login.title')"
        class="login-card block-center"
        size="small"
    >
        <AForm
            :wrapper-col="{ span: 24 }"
            :colon="false"
            @submit="handleSubmit"
            :model="loginForm"
        >
            <AFormItem v-bind="validateInfos.username">
                <AInput
                    @blur="validate('username').catch(() => {})"
                    :placeholder="t('account.login.username.label')"
                    v-model:value="loginForm.username"
                />
            </AFormItem>
            <AFormItem v-bind="validateInfos.password">
                <AInput
                    @blur="validate('password').catch(() => {})"
                    :placeholder="t('account.login.password.label')"
                    v-model:value="loginForm.password"
                    type="password"
                />
            </AFormItem>
            <AFormItem class="mb-0">
                <AButton
                    htmlType="submit"
                    block
                    type="primary"
                    :loading="loading"
                >
                    {{ t('account.login.button') }}
                </AButton>
            </AFormItem>
        </AForm>
    </ACard>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref, toRaw, UnwrapRef } from 'vue';
    import { useForm } from '@ant-design-vue/use';
    import { useI18n } from 'vue-i18n';
    import { LocaleSelector } from '@/components';
    import { useLoading } from '@/composables';
    import { useRouter } from 'vue-router';
    import { LoginForm, AccountService } from '@/services';

    export default defineComponent({
        components: {
            LocaleSelector,
        },
        setup() {
            const { t } = useI18n();

            const loginForm: UnwrapRef<LoginForm> = reactive({
                username: '',
                password: '',
            });

            const rules = reactive({
                username: [
                    {
                        required: true,
                        message: t('account.login.username.empty'),
                        trigger: 'blur',
                    },
                ],
                password: [
                    {
                        required: true,
                        message: t('account.login.password.empty'),
                        trigger: 'blur',
                    },
                ],
            });

            const { validate, validateInfos } = useForm(loginForm, rules);

            const formRef = ref();
            const { loading, task } = useLoading(AccountService.login);
            const router = useRouter();

            const handleSubmit = () => {
                validate()
                    .then(() => {
                        task(toRaw(loginForm))
                            .then(() => {
                                router.push('/');
                            })
                            .catch(() => {});
                    })
                    .catch(() => {});
            };

            return {
                loginForm,
                rules,
                formRef,
                validateInfos,
                handleSubmit,
                validate,
                t,
                loading,
            };
        },
    });
</script>

<style lang="scss">
    .login-brand {
        padding: 32px 0;
    }
    .login-card {
        max-width: 300px;
        width: 90%;
        background: #f6f8fa;
    }
    .languages {
        position: absolute;
        top: 2%;
        right: 4%;
    }
</style>
