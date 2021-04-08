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
            :model="form"
        >
            <AFormItem name="username" v-bind="validateInfos.username">
                <AInput
                    @blur="validate('username').catch(() => {})"
                    :placeholder="t('account.login.username.label')"
                    v-model:value="form.username"
                />
            </AFormItem>
            <AFormItem v-bind="validateInfos.password">
                <AInput
                    @blur="validate('password').catch(() => {})"
                    :placeholder="t('account.login.password.label')"
                    v-model:value="form.password"
                    type="password"
                />
            </AFormItem>
            <AFormItem v-bind="validateInfos.captcha">
                <div class="captcha">
                    <div>
                        <AInput
                            @blur="validate('captcha').catch(() => {})"
                            :placeholder="t('account.login.captcha.label')"
                            v-model:value="form.captcha"
                        />
                    </div>
                    <div class="captcha-img ml-16">
                        <img
                            @click="handleCaptchaRefresh"
                            src="@/assets/captcha.jpg"
                            alt=""
                        />
                    </div>
                </div>
            </AFormItem>
            <AFormItem class="mb-0">
                <div class="flex-justify-between">
                    <ACheckbox v-model:checked="form.remember">
                        {{ t('account.login.remember') }}
                    </ACheckbox>
                    <RouterLink :to="{ name: 'password_reset' }">
                        {{ t('account.login.forgotPassword') }}
                    </RouterLink>
                </div>
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
    import {
        computed,
        defineComponent,
        reactive,
        ref,
        toRaw,
        UnwrapRef,
    } from 'vue';
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

            const captcha = ref('@/assets/captcha.jpg');

            const handleCaptchaRefresh = () => {
                captcha.value = `@/assets/captcha.jpg?t=${new Date().getTime()}`;
            };

            const form: UnwrapRef<LoginForm> = reactive({
                username: '',
                password: '',
                captcha: '',
                remember: false,
            });

            const rules = reactive({
                username: [
                    {
                        required: true,
                        message: computed(() => t('account.login.username.empty')),
                        trigger: 'blur',
                    },
                ],
                password: [
                    {
                        required: true,
                        message: computed(() => t('account.login.password.empty')),
                        trigger: 'blur',
                    },
                ],
                captcha: [
                    {
                        required: true,
                        message: computed(() => t('account.login.captcha.empty')),
                        trigger: 'blur',
                    },
                ],
            });

            const { validate, validateInfos } = useForm(form, rules, {
                validateOnRuleChange: true,
            });

            const formRef = ref();
            const { loading, task } = useLoading(AccountService.login);
            const router = useRouter();

            const handleSubmit = () => {
                validate()
                    .then(() => {
                        task(toRaw(form))
                            .then(() => {
                                router.push('/');
                            })
                            .catch(() => {});
                    })
                    .catch(() => {});
            };

            return {
                form,
                rules,
                formRef,
                validateInfos,
                handleSubmit,
                validate,
                t,
                loading,
                captcha,
                handleCaptchaRefresh,
            };
        },
    });
</script>

<style lang="less">
    .login-brand {
        padding: 32px 0;
    }
    .login-card {
        max-width: 350px;
        width: 90%;
        background: #f6f8fa;
        .ant-form-item {
            margin-bottom: 20px;
        }
        .ant-form-item-with-help {
            margin-bottom: 0;
        }
    }
    .languages {
        position: absolute;
        top: 2%;
        right: 4%;
    }
    .captcha {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
            &:first-child {
                width: 100%;
            }
        }
        &-img {
            padding: 4px 0;
            height: 40px;
            img {
                height: 32px;
                vertical-align: text-bottom;
            }
        }
    }
</style>
