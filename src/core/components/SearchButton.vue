<template>
  <v-btn icon="mdi-magnify" @click="search = true" />
  <v-overlay
    v-model="search"
    content-class="w-100 bg-surface pa-4"
    transition="scroll-x-transition"
  >
    <v-container>
      <div class="d-flex align-center flex-column flex-md-row ga-2">
        <div class="d-flex align-center">
          <v-img src="@/assets/images/logo.webp" width="48" height="48" />
          <div class="font-weight-black text-title-large text-medium-emphasis">RentaMedic</div>
        </div>

        <v-form class="w-100" @submit.prevent="handleSearch">
          <v-text-field
            v-model="searchModel"
            :label="t('search.inputLabel')"
            prepend-inner-icon="mdi-magnify"
            hide-details
            single-line
            clearable
            @click:clear="clearSearch"
          />
        </v-form>
      </div>

      <v-divider class="my-4">
        <span class="text-medium-emphasis text-label-medium">{{ t('search.filterBy') }}</span>
      </v-divider>

      <div class="d-flex flex-column align-center">
        <div class="font-weight-black text-title-large text-medium-emphasis">
          {{ t('search.categoriesTitle') }}
        </div>
        <v-chip-group
          v-model="categoryModel"
          style="width: fit-content"
          mandatory
          selected-class="v-chip--selected v-chip--variant-flat bg-primary"
          @update:model-value="changeCategory"
        >
          <v-chip v-for="item in categories" :key="item.value" :value="item.value">
            {{ item.title }}
          </v-chip>
        </v-chip-group>
      </div>
    </v-container>
  </v-overlay>
</template>

<script setup lang="ts">
  import { ref, computed, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';

  const router = useRouter();
  const { t } = useTypedLocale();

  const search = ref(false);
  const searchModel = ref('');
  const categoryModel = ref('all');

  const categories = computed(() => [
    { value: 'all', title: t('search.categories.all') },
    { value: 'neonatal', title: t('search.categories.neonatal') },
    { value: 'respiratorio', title: t('search.categories.respiratorio') },
    { value: 'laboratorio', title: t('search.categories.laboratorio') },
    { value: 'ortopedico', title: t('search.categories.ortopedico') },
    { value: 'terapeutico', title: t('search.categories.terapeutico') },
    { value: 'odontologia', title: t('search.categories.odontologia') },
    { value: 'ginecologia', title: t('search.categories.ginecologia') },
  ]);

  function handleSearch(): void {
    router.push({
      name: 'search',
      query: {
        product: searchModel.value || undefined,
        category: categoryModel.value || undefined,
      },
    });
    closeSearch();
  }

  function changeCategory(): void {
    router.push({
      name: 'search',
      query: {
        product: searchModel.value || undefined,
        category: categoryModel.value,
      },
    });
    closeSearch();
  }

  function clearSearch(): void {
    nextTick(() => {
      searchModel.value = '';
      categoryModel.value = 'all';
      search.value = false;
    });
  }

  function closeSearch(): void {
    search.value = false;
    nextTick(() => {
      searchModel.value = '';
      categoryModel.value = 'all';
    });
  }
</script>
