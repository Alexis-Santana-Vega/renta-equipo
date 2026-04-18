<template>
  <v-card-text class="d-flex">
    <v-avatar :variant="variant" :color="color" size="x-large">
      <v-icon :icon="icon ?? undefined" size="x-large"></v-icon>
    </v-avatar>
    <div class="pl-4">
      <div class="text-body-large font-weight-medium" v-text="text"></div>
      <div :class="`text-title-large font-weight-bold text-${color}`" v-text="number"></div>
    </div>
  </v-card-text>
</template>
<script setup lang="ts">
  withDefaults(
    defineProps<{
      variant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain';
      color?: string;
      text?: string | number | null;
      number?: string | number | null;
      icon?: string | null;
    }>(),
    {
      variant: 'flat',
      color: 'primary',
      text: null,
      number: null,
      icon: null,
    }
  );
</script>
