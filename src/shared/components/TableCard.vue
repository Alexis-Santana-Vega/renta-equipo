<template>
  <v-card :title="title" :subtitle="subtitle" :loading="loading" :disabled="disabled">
    <template #loader="{ isActive }">
      <v-progress-linear :active="isActive" :color="color" indeterminate />
    </template>
    <template v-if="icon" #prepend>
      <v-icon :icon="icon" variant="tonal" class="mr-1 text-medium-emphasis" size="24"></v-icon>
    </template>
    <v-card-text v-if="$slots.default" class="px-4 pb-4">
      <slot></slot>
    </v-card-text>
    <template #append>
      <slot name="append"></slot>
    </template>
  </v-card>
</template>
<script setup lang="ts">
  withDefaults(
    defineProps<{
      title: string;
      subtitle: string;
      icon: string;
      color?: string;
      loading?: boolean;
      disabled?: boolean;
    }>(),
    {
      color: 'primary',
    }
  );
</script>
