<template>
  <div>
    <div class="text-medium-emphasis text-center">
      <v-avatar size="80" variant="flat">
        <v-img src="@/assets/images/logo.webp" />
      </v-avatar>
      <div class="mt-2 mb-4">
        <!--Este form es el único que tiene mb-4 en vez de mb-8 (por el OTP Input)-->
        <div class="font-weight-black text-headline-medium">Código de Verificación</div>
        <div class="font-weight-medium text-body-medium">
          Ingresa el código de verificación que te enviamos por correo electrónico:
        </div>
      </div>
    </div>
    <v-form @submit.prevent="handleOtpVerification">
      <v-row density="compact">
        <v-col cols="12">
          <v-otp-input v-model="otpModel" length="6" placeholder="0"></v-otp-input>
        </v-col>
        <v-col cols="12">
          <v-btn-custom block :disabled="!isOtpValid" type="submit">
            Verificar código
          </v-btn-custom>
        </v-col>
        <v-col
          cols="12"
          class="font-weight-medium text-body-medium text-medium-emphasis text-center mt-6"
        >
          ¿No recibiste el código?
          <v-chip
            prepend-icon="mdi-refresh"
            class="font-weight-bold"
            color="tertiary"
            @click="handleResendCode"
            >Reenviar código</v-chip
          >
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script setup lang="ts">
  import router from '@/router';
  import { computed, ref } from 'vue';
  const emit = defineEmits<{
    loadingChange: [isLoading: boolean];
  }>();
  const isOtpValid = computed(() => otpModel.value.length === 6);
  const otpModel = ref('');
  const handleOtpVerification = (): void => {
    emit('loadingChange', true);
    // Aquí iría la lógica para manejar la verificación del OTP
    console.log('Verificando OTP con:', otpModel.value);
    setTimeout(() => {
      router.push({ name: 'summary' });
      emit('loadingChange', false);
    }, 2000);
  };
  const handleResendCode = (): void => {
    emit('loadingChange', true);
    // Aquí iría la lógica para manejar el reenvío del código OTP
    console.log('Reenviando código OTP');
    setTimeout(() => {
      alert('Código OTP reenviado. Por favor, revisa tu correo electrónico.');
      emit('loadingChange', false);
    }, 2000);
  };
</script>
