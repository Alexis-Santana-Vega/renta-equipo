<template>
  <div>
    <div class="text-medium-emphasis text-center">
      <v-avatar size="80" variant="flat">
        <v-img src="@/assets/images/logo.webp" />
      </v-avatar>
      <div class="mt-2 mb-8">
        <div class="font-weight-black text-headline-medium">
          {{ title }}
        </div>
        <div class="font-weight-medium text-body-medium">
          {{ subtitle }}
        </div>
      </div>
    </div>

    <v-form
      v-if="state.step === 'request'"
      ref="formRef"
      v-model="state.isModelValid"
      @submit.prevent="handleSubmit"
    >
      <v-row density="compact">
        <v-col cols="12">
          <v-text-field
            v-model="modelForm"
            :label="t('auth.forgotPassword.emailLabel')"
            prepend-inner-icon="mdi-email-outline"
            :placeholder="t('auth.forgotPassword.emailPlaceholder')"
            :rules="formRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn-custom block :disabled="!state.isModelValid" type="submit">
            {{ t('auth.forgotPassword.submit') }}
          </v-btn-custom>
        </v-col>
      </v-row>
    </v-form>

    <div v-if="state.step === 'checkEmail'">
      <v-row density="compact">
        <v-col
          cols="12"
          class="font-weight-medium text-body-medium text-medium-emphasis text-center"
        >
          {{ t('auth.forgotPasswordCheckEmail.notReceived') }}
          <v-chip
            prepend-icon="mdi-refresh"
            class="font-weight-bold"
            color="tertiary"
            @click="handleResendEmail"
            >{{ t('auth.forgotPasswordCheckEmail.resendEmail') }}</v-chip
          >
        </v-col>
        <v-col cols="12" class="text-center mt-2">
          <v-btn-custom variant="tonal" block @click="handleUseAnotherEmail">
            {{ t('auth.forgotPasswordCheckEmail.useAnotherEmail') }}
          </v-btn-custom>
        </v-col>
      </v-row>
    </div>

    <v-row density="compact">
      <v-col
        cols="12"
        class="font-weight-medium text-body-medium text-medium-emphasis text-center my-6"
      >
        {{ t('auth.forgotPassword.rememberPassword') }}
        <router-link
          class="font-weight-bold"
          style="text-decoration: none; color: inherit"
          :to="{ name: 'login' }"
        >
          {{ t('auth.forgotPassword.loginLink') }}
        </router-link>
      </v-col>
      <v-col cols="12" class="text-center text-label-medium text-medium-emphasis">
        {{ t('auth.forgotPassword.legalText') }}
      </v-col>
      <v-col cols="12" class="text-center">
        <WhatsAppButton />
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
  import WhatsAppButton from '@/core/components/WhatsAppButton.vue';
  import { useSwal } from '@/shared/composables/useSwal';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { createValidators } from '@/shared/utils/validators';
  import { computed, reactive, ref } from 'vue';

  type ForgotPasswordStep = 'request' | 'checkEmail';

  const { toast } = useSwal();

  const { t } = useTypedLocale();
  const v = createValidators(t);
  const emit = defineEmits<{
    loadingChange: [isLoading: boolean];
  }>();
  const state = reactive({
    isModelValid: false,
    step: 'request' as ForgotPasswordStep,
  });
  const modelForm = ref('');
  const formRules = computed(() => [
    v.required(),
    v.maxLength(60, t('auth.forgotPassword.emailLabel')),
    v.onlyEmail(t('auth.forgotPassword.emailLabel')),
  ]);
  const title = computed(() =>
    state.step === 'request'
      ? t('auth.forgotPassword.title')
      : t('auth.forgotPasswordCheckEmail.title')
  );
  const subtitle = computed(() =>
    state.step === 'request'
      ? t('auth.forgotPassword.subtitle')
      : t('auth.forgotPasswordCheckEmail.subtitle')
  );
  const handleSubmit = (): void => {
    emit('loadingChange', true);
    console.log('Solicitar enlace para:', modelForm.value);
    setTimeout(() => {
      state.step = 'checkEmail';
      emit('loadingChange', false);
    }, 2000);
  };

  const handleResendEmail = (): void => {
    emit('loadingChange', true);
    console.log('Reenviar enlace a:', modelForm.value);
    setTimeout(() => {
      toast('success', t('auth.forgotPasswordCheckEmail.resentAlert'));
      emit('loadingChange', false);
    }, 2000);
  };

  const handleUseAnotherEmail = (): void => {
    modelForm.value = '';
    state.step = 'request';
  };
</script>
