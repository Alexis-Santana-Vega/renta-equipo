<template>
  <div class="h-100 pa-4">
    <v-card class="h-100" :loading="state.isLoading" :disabled="state.isLoading">
      <template #loader="{ isActive }">
        <v-progress-linear :active="isActive" color="primary" indeterminate></v-progress-linear>
      </template>
      <v-row class="h-100">
        <v-col cols="0" sm="0" md="6" lg="6" xl="6" class="h-100 pa-4">
          <div
            class="bg-image d-flex flex-column align-center justify-center rounded-lg h-100 text-white"
          >
            <div class="font-weight-black text-display-medium">{{ t('layout.title') }}</div>
            <div class="font-weight-medium text-title-medium">
              {{ t('layout.subtitle') }}
            </div>
            <div class="mt-4 d-flex ga-2">
              <language-button />
              <v-avatar icon="mdi-pill" size="large"></v-avatar>
              <v-avatar icon="mdi-medication-outline" size="large"></v-avatar>
              <v-avatar icon="mdi-stethoscope" size="large"></v-avatar>
              <v-avatar icon="mdi-needle" size="large"></v-avatar>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
          class="pa-4 h-100 d-flex align-center justify-center"
        >
          <div style="width: 400px; max-width: 600px">
            <router-view @loading-change="state.isLoading = $event"></router-view>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script setup lang="ts">
  import { reactive } from 'vue';
  import LanguageButton from '../components/LanguageButton.vue';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  const { t } = useTypedLocale();
  const state = reactive({
    isLoading: false,
  });
</script>
<style lang="css" scoped>
  .bg-image {
    /* Fallback para navegadores muy antiguos */
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url('@/assets/images/auth-bg.jpg');
    /* El navegador elige la mejor opción */
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)),
      -webkit-image-set(
          url('@/assets/images/auth-bg.webp') type('image/webp'),
          url('@/assets/images/auth-bg.jpg') type('image/jpeg')
        );
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)),
      image-set(
        url('@/assets/images/auth-bg.webp') type('image/webp'),
        url('@/assets/images/auth-bg.jpg') type('image/jpeg')
      );
    background-size: cover;
    background-position: center;
  }
</style>
