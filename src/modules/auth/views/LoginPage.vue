<template>
  <div>
    <div class="text-medium-emphasis text-center">
      <v-avatar size="80" variant="flat">
        <v-img src="@/assets/images/logo.webp" />
      </v-avatar>
      <div class="mt-2 mb-8">
        <div class="font-weight-black text-headline-medium">{{ t('auth.login.title') }}</div>
        <div class="font-weight-medium text-body-medium">
          {{ t('auth.login.subtitle') }}
        </div>
      </div>
    </div>
    <v-form v-model="state.isModelValid" @submit.prevent="handleLogin">
      <v-row density="compact">
        <v-col cols="12">
          <v-text-field
            v-model="modelForm.email"
            :label="t('auth.login.emailLabel')"
            prepend-inner-icon="mdi-email-outline"
            :placeholder="t('auth.login.emailPlaceholder')"
            :rules="formRules.email"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="modelForm.password"
            :label="t('auth.login.passwordLabel')"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="state.showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :type="state.showPassword ? 'text' : 'password'"
            :placeholder="t('auth.login.passwordPlaceholder')"
            :rules="formRules.password"
            @click:append-inner="state.showPassword = !state.showPassword"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="modelForm.role"
            :label="t('auth.login.roleLabel')"
            prepend-inner-icon="mdi-account-group-outline"
            :placeholder="t('auth.login.rolePlaceholder')"
            :rules="formRules.role"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          class="font-weight-bold text-body-medium text-medium-emphasis text-right mb-5"
        >
          <router-link
            style="text-decoration: none; color: inherit"
            :to="{ name: 'otpVerification' }"
            >{{ t('auth.login.forgotPassword') }}</router-link
          >
        </v-col>
        <v-col cols="12">
          <v-btn-custom block :disabled="!state.isModelValid" type="submit">
            {{ t('auth.login.submit') }}
          </v-btn-custom>
        </v-col>
        <v-col
          cols="12"
          class="font-weight-medium text-body-medium text-medium-emphasis text-center my-6"
        >
          {{ t('auth.login.noAccount') }}
          <router-link
            class="font-weight-bold"
            style="text-decoration: none; color: inherit"
            :to="{ name: 'signup' }"
            >{{ t('auth.login.signUpLink') }}</router-link
          >
        </v-col>
        <v-col cols="12" class="text-center text-label-medium text-medium-emphasis">
          {{ t('auth.login.legalText') }}
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
  import router from '@/core/router';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { createValidators } from '@/shared/utils/validatos';
  import { computed, reactive } from 'vue';

  const { t } = useTypedLocale();
  const v = createValidators(t);
  const emit = defineEmits<{
    loadingChange: [isLoading: boolean];
  }>();
  const state = reactive({
    showPassword: false,
    isModelValid: false,
  });
  const modelForm = reactive({
    email: '',
    password: '',
    role: '',
  });
  const formRules = computed(() => ({
    email: [
      v.required(),
      v.maxLength(60, t('auth.login.emailLabel')),
      v.onlyEmail(t('auth.login.emailLabel')),
    ],
    password: [v.required(), v.maxLength(24, t('auth.login.passwordLabel'))],
    role: [v.required(), v.maxLength(10, t('auth.login.roleLabel'))],
  }));
  const handleLogin = (): void => {
    emit('loadingChange', true);
    // Aquí iría la lógica para manejar el inicio de sesión
    console.log('Iniciando sesión con:', modelForm);
    setTimeout(() => {
      router.push({ name: 'otpVerification' });
      emit('loadingChange', false);
    }, 2000);
  };
</script>
