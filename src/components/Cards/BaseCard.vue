<template>
  <v-card :title="title" :subtitle="subtitle">
    <template v-if="icon" #prepend>
      <v-avatar :icon="icon" color="primary" variant="tonal" class="ml-n2" size="40"></v-avatar>
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
  interface Props {
    title?: string;
    subtitle?: string;
    icon?: string;
  }
  defineProps<Props>();
</script>
