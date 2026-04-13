<template>
  <v-btn icon="mdi-magnify" @click="search = true"></v-btn>
  <v-overlay
    v-model="search"
    content-class="w-100 bg-surface pa-4"
    transition="scroll-x-transition"
  >
    <div class="d-flex align-center flex-column flex-md-row ga-2">
      <div class="d-flex align-center">
        <v-img src="@/assets/images/logo.webp" width="48" height="48"></v-img>
        <div class="font-weight-black text-title-large text-medium-emphasis">RentaMedic</div>
      </div>
      <v-form class="w-100" @submit.prevent="handleSearch">
        <v-text-field
          v-model="searchModel"
          label="Buscar equipo"
          prepend-inner-icon="mdi-magnify"
          hide-details
          single-line
          clearable
          @click:clear="search = false"
        >
        </v-text-field>
      </v-form>
    </div>

    <v-divider class="my-4"
      ><span class="text-medium-emphasis text-label-medium">Puedes filtrar por:</span></v-divider
    >
    <div class="d-flex flex-column align-center">
      <div class="font-weight-black text-title-large text-medium-emphasis">Categorias</div>
      <v-chip-group
        v-model="categoryModel"
        style="width: fit-content"
        mandatory
        selected-class="v-chip--selected v-chip--variant-flat bg-primary"
        @update:model-value="changeCategory"
      >
        <v-chip v-for="(item, index) in categories" :key="index" :value="item.value">{{
          item.title
        }}</v-chip>
      </v-chip-group>
    </div>
  </v-overlay>
</template>
<script setup lang="ts">
  import router from '@/core/router';
  import { nextTick } from 'vue';
  import { ref } from 'vue';

  const search = ref(false);
  const searchModel = ref('');
  const categoryModel = ref('all');
  const categories = [
    { title: 'Todos', value: 'all' },
    { title: 'Neonatal', value: 'neonatal' },
    { title: 'Respiratorio', value: 'respiratorio' },
    { title: 'Laboratorio', value: 'laboratorio' },
    { title: 'Ortopédico', value: 'ortopedico' },
    { title: 'Terapéutico', value: 'terapeutico' },
    { title: 'Odontología', value: 'odontologia' },
    { title: 'Ginecología', value: 'ginecologia' },
  ];
  const handleSearch = (): void => {
    router.push({
      name: 'search',
      query: { product: searchModel.value, category: categoryModel.value || undefined },
    });
    closeSearch();
  };
  // Revisar luego esta función
  const changeCategory = (): void => {};
  /*
  const changeCategory = (): void => {
    router.push({
      name: 'search',
      query: { product: searchModel.value || undefined, category: categoryModel.value },
    });
    closeSearch();
  };
  */
  const closeSearch = (): void => {
    search.value = false;
    nextTick(() => {
      searchModel.value = '';
    });
  };
</script>
