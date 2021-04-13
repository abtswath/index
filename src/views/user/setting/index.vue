<template>
    <APageHeader :back-icon="false" class="bb-1">
        {{ t('user.profile.title') }}
    </APageHeader>
    <AForm
        class="profile-form mt-16"
        layout="horizontal"
        :colon="false"
        :label-col="{ span: 4, xs: 4, md: 2 }"
        :wrapper-col="{ span: 14, xs: 18, md: 8 }"
        label-align="right"
        :model="form"
        :rules="rules"
        ref="formRef"
        @finish="handleSubmit"
    >
        <AFormItem
            name="avatar"
            :label="t('user.profile.avatar.label')"
            :validate-status="validateAvatarStatus"
            :help="validateAvatarMessage"
        >
            <AUpload
                v-model:file-list="fileList"
                accept="image/png, image/jpeg"
                name="avatar"
                action="/api/avatar"
                :before-upload="beforeUpload"
                list-type="picture-card"
                :show-upload-list="false"
                @change="handleUploadChange"
                class="profile-form_avatar"
            >
                <img v-if="form.avatar" :src="form.avatar" alt="avatar" />
                <div v-else>
                    <PlusOutlined />
                </div>
            </AUpload>
        </AFormItem>
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
        <AFormItem label=" ">
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
    import { PlusOutlined } from '@ant-design/icons-vue';

    export default defineComponent({
        components: {
            PlusOutlined,
        },
        setup() {
            const formRef = ref();
            const store = useStore();
            const { t } = useI18n();

            const fileList = ref([]);

            const validateAvatarStatus = ref('success');
            const validateAvatarMessage = ref('');

            const info = store.getters['user/info'];

            const form: UnwrapRef<Profile> = reactive({
                avatar: info && info.avatar,
                username: info && info.username,
                name: info && info.name,
                email: info && info.email,
                description: info && info.description,
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

            const beforeUpload = (file: File) => {
                if (file.size > 1024 * 1024 * 2) {
                    validateAvatarStatus.value = 'error';
                    validateAvatarMessage.value = t('user.profile.avatar.tooLarge');
                    return false;
                }
                validateAvatarStatus.value = 'success';
                validateAvatarMessage.value = '';
                return true;
            };

            const handleUploadChange = ({ file }: any) => {
                if (file.status === 'error') {
                    message.error(file.response.message);
                } else if (file.status === 'done') {
                    form.avatar = file.response.data;
                }
            };

            return {
                fileList,
                formRef,
                t,
                form,
                rules,
                handleSubmit,
                loading,
                beforeUpload,
                validateAvatarStatus,
                validateAvatarMessage,
                handleUploadChange,
            };
        },
    });
</script>

<style lang="less">
    .profile-form {
        .ant-form-item-label {
            @media (max-width: 575px) {
                display: inline-block !important;
                line-height: 40px !important;
                padding: 0 8px 0 0 !important;
                text-align: right !important;
            }
        }
        &_avatar {
            .ant-upload.ant-upload-select-picture-card {
                border-radius: 50%;
                .ant-upload {
                    padding: 0;
                    width: 104px;
                    height: 104px;
                    img {
                        border-radius: 50%;
                        width: 104px;
                        height: 104px;
                    }
                }
            }
        }
    }
</style>
