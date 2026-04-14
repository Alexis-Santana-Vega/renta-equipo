<template>
  <div>
    <div class="text-medium-emphasis text-center">
      <v-avatar size="80" variant="flat">
        <v-img src="@/assets/images/logo.webp" />
      </v-avatar>
      <div class="mt-2 mb-8">
        <div class="font-weight-black text-headline-medium">{{ t('auth.signup.title') }}</div>
        <div class="font-weight-medium text-body-medium">
          {{ t('auth.signup.subtitle') }}
        </div>
      </div>
    </div>
    <v-form v-model="state.isModelValid" @submit.prevent="handleSignup">
      <v-row density="compact">
        <v-col cols="12">
          <v-text-field
            v-model="modelForm.fullName"
            :label="t('auth.signup.fullNameLabel')"
            prepend-inner-icon="mdi-account-outline"
            :placeholder="t('auth.signup.fullNamePlaceholder')"
            :rules="formRules.fullName"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="modelForm.email"
            :label="t('auth.signup.emailLabel')"
            prepend-inner-icon="mdi-email-outline"
            :placeholder="t('auth.signup.emailPlaceholder')"
            :rules="formRules.email"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="modelForm.password"
            :label="t('auth.signup.passwordLabel')"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="state.showPassword1 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :type="state.showPassword1 ? 'text' : 'password'"
            :placeholder="t('auth.signup.passwordPlaceholder')"
            :rules="formRules.password"
            @click:append-inner="state.showPassword1 = !state.showPassword1"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="modelForm.confirmPassword"
            :label="t('auth.signup.confirmPasswordLabel')"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="state.showPassword2 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :type="state.showPassword2 ? 'text' : 'password'"
            :placeholder="t('auth.signup.confirmPasswordPlaceholder')"
            :rules="formRules.confirmPassword"
            @click:append-inner="state.showPassword2 = !state.showPassword2"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn-custom block :disabled="!state.isModelValid" type="submit">
            {{ t('auth.signup.submit') }}
          </v-btn-custom>
        </v-col>
        <v-col
          cols="12"
          class="font-weight-medium text-body-medium text-medium-emphasis text-center my-6"
        >
          {{ t('auth.signup.alreadyHaveAccount') }}
          <router-link
            class="font-weight-bold"
            style="text-decoration: none; color: inherit"
            :to="{ name: 'login' }"
            >{{ t('auth.signup.loginLink') }}</router-link
          >
        </v-col>
        <v-col cols="12" class="text-center text-label-medium text-medium-emphasis">
          {{ t('auth.signup.legalText') }}
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
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { createValidators } from '@/shared/utils/validators';
  import { computed, reactive } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const { t } = useTypedLocale();
  const v = createValidators(t);
  const emit = defineEmits<{
    loadingChange: [isLoading: boolean];
  }>();
  const state = reactive({
    showPassword1: false,
    showPassword2: false,
    isModelValid: false,
  });
  const modelForm = reactive({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const formRules = computed(() => ({
    fullName: [
      v.required(),
      v.maxLength(60, t('auth.signup.fullNameLabel')),
      v.onlyLetters(t('auth.signup.fullNameLabel')),
    ],
    email: [
      v.required(),
      v.maxLength(60, t('auth.signup.emailLabel')),
      v.onlyEmail(t('auth.signup.emailLabel')),
    ],
    password: [v.required(), v.maxLength(24, t('auth.signup.passwordLabel')), v.onlyPassword()],
    confirmPassword: [
      v.required(),
      v.maxLength(24, t('auth.signup.confirmPasswordLabel')),
      (value: string) => value === modelForm.password || t('auth.signup.passwordMismatch'),
    ],
  }));
  const handleSignup = (): void => {
    emit('loadingChange', true);
    // Aquí iría la lógica para manejar el registro
    console.log('Registrando con:', modelForm);
    if (modelForm.password !== modelForm.confirmPassword) {
      alert(t('auth.signup.passwordMismatch'));
      return;
    }
    setTimeout(() => {
      alert(t('auth.signup.signupSuccess'));
      emit('loadingChange', false);
      router.push({ name: 'summary' });
    }, 2000);
  };
</script>
