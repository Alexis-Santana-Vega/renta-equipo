<template>
  <div>
    <div class="text-medium-emphasis text-center">
      <v-avatar size="80" variant="flat">
        <v-img src="@/assets/images/logo.webp" />
      </v-avatar>
      <div class="mt-2 mb-8">
        <div class="font-weight-black text-headline-medium">Inicio de Sesión</div>
        <div class="font-weight-medium text-body-medium">
          Ingrese a la plataforma para consultar nuestro catálogo:
        </div>
      </div>
    </div>
    <v-form v-model="state.isModelValid" @submit.prevent="handleLogin">
      <v-row density="compact">
        <v-col cols="12">
          <v-text-field
            v-model="modelForm.email"
            label="Correo electrónico"
            prepend-inner-icon="mdi-email-outline"
            placeholder="Ingresa tu correo electrónico"
            :rules="formRules.email"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="modelForm.password"
            label="Contraseña"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="state.showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :type="state.showPassword ? 'text' : 'password'"
            placeholder="Ingresa tu contraseña"
            :rules="formRules.password"
            @click:append-inner="state.showPassword = !state.showPassword"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="modelForm.role"
            label="Rol"
            prepend-inner-icon="mdi-account-group-outline"
            placeholder="Ingresa tu rol"
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
            >¿Olvidaste tu contraseña?</router-link
          >
        </v-col>
        <v-col cols="12">
          <v-btn-custom block :disabled="!state.isModelValid" type="submit">
            Ingresar
          </v-btn-custom>
        </v-col>
        <v-col
          cols="12"
          class="font-weight-medium text-body-medium text-medium-emphasis text-center my-6"
        >
          ¿No tienes una cuenta?
          <router-link
            class="font-weight-bold"
            style="text-decoration: none; color: inherit"
            :to="{ name: 'signup' }"
            >Regístrate aquí</router-link
          >
        </v-col>
        <v-col cols="12" class="text-center text-label-medium text-medium-emphasis">
          Renta de Equipo Médico a Hospitales y Particulares
        </v-col>
        <v-col cols="12" class="text-center">
          <WhatsAppButton />
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script setup lang="ts">
  import WhatsAppButton from '@/layouts/components/WhatsAppButton.vue';
  import router from '@/router';
  import { maxLength, onlyEmail, required } from '@/utils/validators';
  import { reactive } from 'vue';
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
  const formRules = {
    email: [required(), maxLength(60, 'Correo electrónico'), onlyEmail()],
    password: [required(), maxLength(24, 'Contraseña')],
    role: [required(), maxLength(10, 'Rol')],
  };
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
