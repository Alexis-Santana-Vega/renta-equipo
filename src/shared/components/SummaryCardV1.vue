<template>
  <v-card :variant="variant" :color="color">
    <v-card-text class="d-flex justify-space-between">
      <div class="pr-4">
        <div class="text-title-large font-weight-bold" v-text="number"></div>
        <div class="text-body-large" v-text="text"></div>
      </div>
      <v-avatar :variant="variant" :color="color" size="x-large">
        <v-icon :icon="icon ?? undefined" size="x-large"></v-icon>
      </v-avatar>
    </v-card-text>
  </v-card>
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
