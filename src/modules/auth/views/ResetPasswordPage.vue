<template>
  <div>
    <div class="text-medium-emphasis text-center">
      <v-avatar size="80" variant="flat">
        <v-img src="@/assets/images/logo.webp" />
      </v-avatar>
      <div class="mt-2 mb-8">
        <div class="font-weight-black text-headline-medium">
          {{ t('auth.resetPassword.title') }}
        </div>
        <div class="font-weight-medium text-body-medium">
          {{ t('auth.resetPassword.subtitle') }}
        </div>
      </div>
    </div>
    <v-form v-model="state.isModelValid" @submit.prevent="handleSubmit">
      <v-row density="compact">
        <v-col cols="12">
          <v-text-field
            v-model="modelForm.newPassword"
            :label="t('auth.resetPassword.newPasswordLabel')"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="state.showNewPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :type="state.showNewPassword ? 'text' : 'password'"
            :placeholder="t('auth.resetPassword.newPasswordPlaceholder')"
            :rules="formRules.newPassword"
            @click:append-inner="state.showNewPassword = !state.showNewPassword"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="modelForm.confirmPassword"
            :label="t('auth.resetPassword.confirmPasswordLabel')"
            prepend-inner-icon="mdi-lock-check-outline"
            :append-inner-icon="
              state.showConfirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            :type="state.showConfirmPassword ? 'text' : 'password'"
            :placeholder="t('auth.resetPassword.confirmPasswordPlaceholder')"
            :rules="formRules.confirmPassword"
            @click:append-inner="state.showConfirmPassword = !state.showConfirmPassword"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn-custom block :disabled="!state.isModelValid" type="submit">
            {{ t('auth.resetPassword.submit') }}
          </v-btn-custom>
        </v-col>
        <v-col
          cols="12"
          class="font-weight-medium text-body-medium text-medium-emphasis text-center my-6"
        >
          {{ t('auth.resetPassword.rememberPassword') }}
          <router-link
            class="font-weight-bold"
            style="text-decoration: none; color: inherit"
            :to="{ name: 'login' }"
            >{{ t('auth.resetPassword.loginLink') }}</router-link
          >
        </v-col>
        <v-col cols="12" class="text-center text-label-medium text-medium-emphasis">
          {{ t('auth.resetPassword.legalText') }}
        </v-col>
        <v-col cols="12" class="text-center">
          <WhatsAppButton />
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script setup lang="ts">
  import WhatsAppButton from '@/core/components/WhatsAppButton.vue';
  import { useSwal } from '@/shared/composables/useSwal';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { createValidators } from '@/shared/utils/validators';
  import { computed, reactive } from 'vue';
  import { useRouter } from 'vue-router';

  const { toast } = useSwal();
  const router = useRouter();
  const { t } = useTypedLocale();
  const v = createValidators(t);
  const emit = defineEmits<{
    loadingChange: [isLoading: boolean];
  }>();
  const state = reactive({
    showNewPassword: false,
    showConfirmPassword: false,
    isModelValid: false,
  });
  const modelForm = reactive({
    newPassword: '',
    confirmPassword: '',
  });
  const formRules = computed(() => ({
    newPassword: [
      v.required(),
      v.maxLength(24, t('auth.resetPassword.newPasswordLabel')),
      v.onlyPassword(t('auth.resetPassword.newPasswordLabel')),
    ],
    confirmPassword: [
      v.required(),
      v.maxLength(24, t('auth.resetPassword.confirmPasswordLabel')),
      (value: string) => value === modelForm.newPassword || t('auth.signup.passwordMismatch'),
    ],
  }));
  const handleSubmit = (): void => {
    emit('loadingChange', true);
    // Aquí iría la lógica para actualizar la contraseña
    console.log('Actualizando contraseña');
    setTimeout(() => {
      toast('success', t('auth.resetPassword.successAlert'));
      router.push({ name: 'login' });
      emit('loadingChange', false);
    }, 2000);
  };
</script>
