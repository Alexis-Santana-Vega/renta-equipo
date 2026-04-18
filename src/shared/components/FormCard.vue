<template>
  <v-card>
    <v-card-text>
      <v-icon v-if="icon" :icon="icon" opacity=".7" class="mr-2"></v-icon>
      <span class="font-weight-bold text-medium-emphasis" v-text="title"></span>
      <div class="pt-4">
        <v-defaults-provider :defaults="defaults">
          <slot></slot>
        </v-defaults-provider>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
  defineProps<{
    title?: string;
    icon?: string;
  }>();
  const defaults = {
    VRow: { density: 'compact' },
  };
</script>
