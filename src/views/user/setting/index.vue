<template>
    <APageHeader :back-icon="false" class="bb-1"> 基本信息 </APageHeader>
    <AForm
        class="profile-form mt-16"
        layout="horizontal"
        :colon="false"
        :label-col="{ span: 4, xs: 4 }"
        :wrapper-col="{ span: 14, xs: 18 }"
        label-align="right"
        :rules="rules"
        :model="form"
        ref="formRef"
        @submit="handleSubmit"
    >
        <AFormItem label="用户名">
            <AInput :value="form.username" disabled />
        </AFormItem>
        <AFormItem name="name" label="姓名">
            <AInput v-model:value="form.name" />
        </AFormItem>
        <AFormItem name="email" label="邮箱">
            <AInput v-model:value="form.email" />
        </AFormItem>
        <AFormItem name="description" label="描述" help="描述不能超过200字">
            <ATextarea
                v-model:value="form.description"
                :auto-size="{ minRows: 4, maxRows: 4 }"
            />
        </AFormItem>
        <AFormItem :wrapper-col="{ offset: 4 }">
            <AButton :loading="loading" htmlType="submit" type="primary">
                保存
            </AButton>
        </AFormItem>
    </AForm>
</template>

<script lang="ts">
    import { useLoading } from '@/composables';
    import { Profile, UserService } from '@/services';
    import { message } from 'ant-design-vue';
    import {
        ComponentPublicInstance,
        computed,
        defineComponent,
        reactive,
        ref,
    } from 'vue';

    export default defineComponent({
        beforeRouteEnter(to, from, next) {
            UserService.getProfile()
                .then((response) => {
                    next((vm) => {
                        const instance = vm as {
                            form: Profile;
                        } & ComponentPublicInstance;
                        instance.form.username = response.data.username;
                        instance.form.name = response.data.name;
                        instance.form.email = response.data.email;
                        instance.form.description = response.data.description;
                    });
                })
                .catch(() => {
                    next({ name: from.name || 'home' });
                });
        },
        setup() {
            const form = reactive<Profile>({
                username: '',
                name: '',
                email: '',
                description: '',
            });

            const rules = computed(() => {
                return {
                    name: [
                        { required: true, message: '请填写姓名', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '请填写邮箱', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式错误', trigger: 'blur' },
                    ],
                    description: [
                        { max: 500, message: '描述不能超过200字', trigger: 'blur' },
                    ],
                };
            });

            const formRef = ref();
            const { loading, task } = useLoading(UserService.saveProfile);
            const handleSubmit = () => {
                formRef.value
                    .validate()
                    .then(() => {
                        task(form)
                            .then(() => {
                                message.success('操作成功');
                            })
                            .catch(() => {});
                    })
                    .catch(() => {});
            };

            return {
                formRef,
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
