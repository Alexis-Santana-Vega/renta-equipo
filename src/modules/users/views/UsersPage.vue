<template>
  <v-container>
    <div>{{ t('auth.login.forgotPassword') }}</div>
    <div>{{ t('$vuetify.calendar.moreEvents', { name: 'red' }) }}</div>
  </v-container>
</template>
<script setup lang="ts">
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';

  const { t } = useTypedLocale();
</script>
