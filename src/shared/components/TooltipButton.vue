<template>
  <v-btn :color="iconColor" icon :variant="variant" :size="size" :density="density">
    <v-icon :icon="icon" :size="iconSize"></v-icon>
    <v-tooltip
      v-if="text"
      activator="parent"
      :text="text"
      :location="location"
      :content-class="`bg-${color} font-weight-medium`"
    ></v-tooltip>
  </v-btn>
</template>
<script setup lang="ts">
  withDefaults(
    defineProps<{
      density?: 'comfortable' | 'compact' | 'default';
      text: string;
      color?: string;
      icon: string;
      iconColor?: string;
      variant?: 'text' | 'tonal';
      location?: 'start' | 'end' | 'top' | 'bottom';
      size?: string;
      iconSize?: string;
    }>(),
    {
      density: 'default',
      color: 'default',
      iconColor: 'default',
      location: 'top',
      variant: 'text',
      size: 'small',
      iconSize: 'large',
    }
  );
</script>
