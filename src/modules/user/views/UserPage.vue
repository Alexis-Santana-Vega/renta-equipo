<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(item, i) in summary" :key="i" cols="12" sm="12" md="6" lg="3" xl="3">
        <summary-card-v3
          :text="item.text"
          :number="item.number"
          :icon="item.icon"
          :color="item.color"
        ></summary-card-v3>
      </v-col>
      <v-col cols="12">
        <v-btn-custom @click="scanner = true">Abrir Scanner</v-btn-custom>
        <v-dialog :model-value="scanner" persistent scrollable width="600" rounded="lg">
          <scanner-picker @close-scanner="scanner = false"></scanner-picker>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import SummaryCardV3 from '@/shared/components/SummaryCardV3.vue';
  import ScannerPicker from '@/shared/components/ScannerPicker/ScannerPicker.vue';

  const scanner = ref(false);
  const summary = ref([
    { text: 'Total', number: '6', icon: 'mdi-table-check', color: 'secondary' },
    { text: 'Disponibles', number: '3', icon: 'mdi-check-circle-outline', color: 'success' },
    { text: 'Rentados', number: '2', icon: 'mdi-table-cancel', color: 'warning' },
    { text: 'Mantenimiento', number: '1', icon: 'mdi-close-circle-outline', color: 'error' },
  ]);
</script>
