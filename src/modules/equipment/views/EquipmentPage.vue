<script setup lang="ts">
  import ScannerPicker from '@/shared/components/ScannerPicker.vue';
  import { useSwal } from '@/shared/composables/useSwal';
  import { ref } from 'vue';
  const scanner = ref(false);
  const { toast } = useSwal();
  const handleCode = (code: string): void => {
    toast('info', code);
  };
</script>

<template>
  <v-container>
    <v-btn-custom @click="scanner = !scanner">Abrir</v-btn-custom>
    <ScannerPicker v-model="scanner" @detected-code="handleCode"></ScannerPicker>
  </v-container>
</template>
