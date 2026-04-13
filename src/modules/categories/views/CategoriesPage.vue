<template>
  <v-container>
    <BaseCard
      icon="mdi-tag-outline"
      subtitle="Gestiona las categorías de los equipos"
      title="Categorías"
    >
      <v-row>
        <v-col>
          <v-btn-custom
            @click="confirm('Confirmar acción', 'question', '¿Desea confirmar la acción?')"
            >Confirmar</v-btn-custom
          >
        </v-col>
        <v-col>
          <v-btn-custom @click="toast('question', 'Acción ejecutada')">Toast</v-btn-custom>
        </v-col>
      </v-row>
    </BaseCard>
  </v-container>
</template>
<script setup lang="ts">
  import BaseCard from '@/shared/components/BaseCard.vue';
  import { useSwal } from '@/shared/composables/useSwal';
  const { confirm, toast } = useSwal();
  //
</script>
