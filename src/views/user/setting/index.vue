<template>
    <APageHeader :back-icon="false" class="bb-1"> 基本信息 </APageHeader>
    <AForm
        class="profile-form mt-16"
        layout="horizontal"
        :colon="false"
        :label-col="{ span: 4, xs: 4 }"
        :wrapper-col="{ span: 14, xs: 18 }"
        label-align="right"
        :model="form"
        :rules="rules"
        ref="formRef"
        @finish="handleSubmit"
    >
        <AFormItem name="username" :label="t('user.profile.username.label')">
            <AInput :value="form.username" disabled />
        </AFormItem>
        <AFormItem name="name" :label="t('user.profile.name.label')">
            <AInput v-model:value="form.name" />
        </AFormItem>
        <AFormItem name="email" :label="t('user.profile.email.label')">
            <AInput v-model:value="form.email" />
        </AFormItem>
        <AFormItem
            name="description"
            :label="t('user.profile.description.label')"
            :help="t('user.profile.description.invalid')"
        >
            <ATextarea
                v-model:value="form.description"
                :auto-size="{ minRows: 4, maxRows: 4 }"
            />
        </AFormItem>
        <AFormItem :wrapper-col="{ offset: 4 }">
            <AButton :loading="loading" htmlType="submit" type="primary">
                {{ t('common.submit') }}
            </AButton>
        </AFormItem>
    </AForm>
</template>

<script lang="ts">
    import { useLoading } from '@/composables';
    import { Profile, UserService } from '@/services';
    import { message } from 'ant-design-vue';
    import { computed, defineComponent, reactive, ref, UnwrapRef } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useStore } from 'vuex';

    export default defineComponent({
        setup() {
            const formRef = ref();
            const store = useStore();
            const { t } = useI18n();

            const info = store.getters['user/info'];

            const form: UnwrapRef<Profile> = reactive({
                username: info.username,
                name: info.name,
                email: info.email,
                description: info.description,
            });

            const rules = computed(() => {
                return {
                    name: [
                        {
                            required: true,
                            message: t('user.profile.name.empty'),
                            trigger: 'blur',
                        },
                    ],
                    email: [
                        {
                            required: true,
                            message: t('user.profile.email.empty'),
                            trigger: 'blur',
                        },
                        {
                            type: 'email',
                            message: t('user.profile.email.invalid'),
                            trigger: 'blur',
                        },
                    ],
                    description: [
                        {
                            max: 500,
                            type: 'string',
                            message: t('user.profile.description.invalid'),
                            trigger: 'blur',
                        },
                    ],
                };
            });

            const { loading, task } = useLoading(UserService.saveProfile);
            const handleSubmit = () => {
                task(form)
                    .then(() => {
                        message.success(t('common.success'));
                        store.dispatch('user/setUserInfo', form);
                    })
                    .catch(() => {});
            };

            return {
                formRef,
                t,
                form,
                rules,
                handleSubmit,
                loading,
            };
        },
    });
</script>

<style lang="less" scoped>
    .profile-form {
        .ant-form-item-label {
            @media (max-width: 575px) {
                display: inline-block !important;
                line-height: 40px !important;
                padding: 0 8px 0 0 !important;
                text-align: right !important;
            }
        }
    }
</style>
