<template>
  <v-dialog
    :model-value="modelValue"
    persistent
    scrollable
    :width="width"
    :fullscreen="isCompact"
    transition="slide-y-reverse-transition"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card :loading="loading" :disabled="disabled" :rounded="isCompact ? '0' : 'lg'">
      <template #loader="{ isActive }">
        <v-progress-linear :active="isActive" :color="color" indeterminate />
      </template>

      <v-toolbar :class="isCompact ? '' : 'vss-movable'" density="comfortable">
        <v-icon :icon="icon" class="ml-4 mr-n2"></v-icon>
        <v-toolbar-title class="vss-movable text-medium-emphasis">
          {{ title }}
        </v-toolbar-title>
        <v-btn icon="mdi-close" @click="emit('close')" />

        <template v-if="extension" #extension>
          <slot name="extension" />
        </template>
      </v-toolbar>

      <v-card-text class="bg-background pa-4">
        <slot />
      </v-card-text>

      <v-card-actions v-if="actions">
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useDisplay } from 'vuetify';

  const props = withDefaults(
    defineProps<{
      modelValue: boolean;
      title: string;
      icon: string;
      color?: string;
      loading?: boolean;
      disabled?: boolean;
      actions?: boolean;
      fullscreen?: boolean;
      extension?: boolean;
      width?: string;
    }>(),
    {
      width: '500',
      color: 'primary',
      fullscreen: false,
    }
  );

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'close'): void;
  }>();

  const { smAndDown } = useDisplay();

  const isCompact = computed(() => props.fullscreen || smAndDown.value);
</script>
