<template>
  <div>
    <div class="text-medium-emphasis text-center">
      <v-avatar size="80" variant="flat">
        <v-img src="@/assets/images/logo.webp" />
      </v-avatar>
      <div class="mt-2 mb-8">
        <div class="font-weight-black text-headline-medium">Registro</div>
        <div class="font-weight-medium text-body-medium">
          Regístrate en la plataforma para consultar nuestro catálogo:
        </div>
      </div>
    </div>
    <v-form v-model="state.isModelValid" @submit.prevent="handleSignup">
      <v-row density="compact">
        <v-col cols="12">
          <v-text-field
            v-model="modelForm.fullName"
            label="Nombre completo"
            prepend-inner-icon="mdi-account-outline"
            placeholder="Ingresa tu nombre completo"
            :rules="formRules.fullName"
          ></v-text-field>
        </v-col>
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
            :append-inner-icon="state.showPassword1 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :type="state.showPassword1 ? 'text' : 'password'"
            placeholder="Ingresa tu contraseña"
            :rules="formRules.password"
            @click:append-inner="state.showPassword1 = !state.showPassword1"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="modelForm.confirmPassword"
            label="Confirma tu contraseña"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="state.showPassword2 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :type="state.showPassword2 ? 'text' : 'password'"
            placeholder="Ingresa tu contraseña nuevamente"
            :rules="formRules.confirmPassword"
            @click:append-inner="state.showPassword2 = !state.showPassword2"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn-custom block :disabled="!state.isModelValid" type="submit">
            Registrarse
          </v-btn-custom>
        </v-col>
        <v-col
          cols="12"
          class="font-weight-medium text-body-medium text-medium-emphasis text-center my-6"
        >
          ¿Ya tienes una cuenta?
          <router-link
            class="font-weight-bold"
            style="text-decoration: none; color: inherit"
            :to="{ name: 'login' }"
            >Inicia sesión aquí</router-link
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
  import { maxLength, required, onlyLetters, onlyEmail, onlyPassword } from '@/utils/validators';
  import { reactive } from 'vue';
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
  const formRules = {
    fullName: [required(), maxLength(60, 'Nombre completo'), onlyLetters('Nombre completo')],
    email: [required(), maxLength(60, 'Correo electrónico'), onlyEmail()],
    password: [required(), maxLength(24, 'Contraseña'), onlyPassword()],
    confirmPassword: [
      required(),
      maxLength(24, 'Confirma tu contraseña'),
      (value: string) => value === modelForm.password || 'Las contraseñas no coinciden',
    ],
  };
  const handleSignup = (): void => {
    emit('loadingChange', true);
    // Aquí iría la lógica para manejar el registro
    console.log('Registrando con:', modelForm);
    if (modelForm.password !== modelForm.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    setTimeout(() => {
      alert('Registro exitoso');
      router.push({ name: 'summary' });
      emit('loadingChange', false);
    }, 2000);
  };
</script>
