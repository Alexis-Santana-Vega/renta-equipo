<template>
  <div>{{ t('auth.login.forgotPassword') }}</div>
  <div>{{ t('$vuetify.calendar.moreEvents', { name: 'red' }) }}</div>
</template>
<script setup lang="ts">
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';

  const { t } = useTypedLocale();
</script>
