<template>
  <v-card variant="flat" :class="`border-b-lg border-opacity-100 border-${color}`">
    <v-card-text>
      <div class="d-flex align-center justify-center pb-2">
        <v-avatar :variant="variant" :color="color" size="x-large">
          <v-icon :icon="icon ?? undefined" size="x-large"></v-icon>
        </v-avatar>
        <div class="text-title-large font-weight-bold pl-4" v-text="number"></div>
      </div>
      <div class="text-body-large text-center" v-text="text"></div>
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
      variant: 'tonal',
      color: 'primary',
      text: null,
      number: null,
      icon: null,
    }
  );
</script>
