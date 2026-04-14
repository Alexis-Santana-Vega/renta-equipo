<template>
  <v-btn
    class="text-label-medium"
    variant="tonal"
    prepend-icon="mdi-phone-outline"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
  >
    {{ t('whatsapp.label') }}
  </v-btn>
</template>
<script setup lang="ts">
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { computed } from 'vue';

  const { t } = useTypedLocale();
  const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER;

  const url = computed(() => {
    const message = t('whatsapp.prefilledMessage');
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  });
</script>
