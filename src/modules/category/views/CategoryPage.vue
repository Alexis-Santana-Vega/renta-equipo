<template>
  <v-container fluid>
    <TableCard
      icon="mdi-tag-outline"
      :title="t('category.page.title')"
      :subtitle="t('category.page.subtitle')"
    >
      <v-row density="compact">
        <v-col cols="12" md="6" lg="8" xl="9">
          <IteratorHeader>
            <v-btn-custom prepend-icon="mdi-plus" @click="openCategoryDialog()">
              {{ t('category.actions.add') }}
            </v-btn-custom>
          </IteratorHeader>
        </v-col>
        <v-col cols="12" md="6" lg="4" xl="3">
          <IteratorHeader>
            <v-text-field
              v-model="state.categorySearch"
              :placeholder="t('category.search')"
              single-line
              hide-details
              clearable
              prepend-inner-icon="mdi-magnify"
            />
          </IteratorHeader>
        </v-col>
        <v-col cols="12">
          <v-data-table
            :items="categoryItems"
            :headers="categoryHeaders"
            :search="state.categorySearch"
            :loading="state.loadingTable"
          >
            <template #loading>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template #item.name="{ value: value }">
              <span class="font-weight-medium">{{ value }}</span>
            </template>
            <template #item.description="{ value }">
              <span class="text-caption">{{ value }}</span>
            </template>
            <template #item.actions="{ item }">
              <TooltipButton
                icon="mdi-delete-outline"
                :text="t('category.actions.delete')"
                color="error"
                @click="confirmDeleteCategory(item)"
              />
              <TooltipButton
                icon="mdi-circle-edit-outline"
                :text="t('category.actions.edit')"
                color="secondary"
                @click="openCategoryDialog(item)"
              />
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </TableCard>

    <!-- ─── Dialog: categoría ─────────────────────────────────────── -->
    <DialogCard
      v-model="state.dialogCategory"
      :title="categoryDialogMeta.title"
      :icon="categoryDialogMeta.icon"
      :color="categoryDialogMeta.color"
      :loading="state.loadingCategoryDialog"
      :disabled="state.loadingCategoryDialog"
      width="1000"
      actions
      @close="closeCategoryDialog"
    >
      <v-row>
        <!-- Información general -->
        <v-col cols="12">
          <FormCard :title="t('category.form.generalInfo')">
            <v-form v-model="state.categoryFormValid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedCategory.name"
                    :label="t('category.form.name')"
                    :color="categoryDialogMeta.color"
                    :rules="categoryRules.name"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="editedCategory.description"
                    :label="t('category.form.description')"
                    :color="categoryDialogMeta.color"
                    :rules="categoryRules.description"
                  />
                </v-col>
                <v-col cols="12" class="text-label-medium text-disabled">
                  {{ t('common.requiredFields') }}
                </v-col>
              </v-row>
            </v-form>
          </FormCard>
        </v-col>

        <!-- Características -->
        <v-col cols="12">
          <FormCard :title="t('category.features.title')" icon="mdi-tag-multiple-outline">
            <v-data-table
              :items="editedCategory.features"
              :headers="featureHeaders"
              :search="state.featureSearch"
            >
              <template #top>
                <v-row>
                  <v-col cols="12" md="7">
                    <IteratorHeader>
                      <v-btn-custom
                        prepend-icon="mdi-plus"
                        :block="smAndDown"
                        :color="categoryDialogMeta.color"
                        @click="openFeatureDialog()"
                      >
                        {{ t('category.features.add') }}
                      </v-btn-custom>
                    </IteratorHeader>
                  </v-col>
                  <v-col cols="12" md="5">
                    <IteratorHeader>
                      <v-text-field
                        v-model="state.featureSearch"
                        :placeholder="t('category.features.search')"
                        single-line
                        hide-details
                        clearable
                        prepend-inner-icon="mdi-magnify"
                      />
                    </IteratorHeader>
                  </v-col>
                </v-row>
              </template>

              <template #item.measure="{ item }">
                <v-chip
                  v-if="item.idMeasure"
                  :prepend-icon="item.measureIcon ?? undefined"
                  :color="item.measureColor ?? undefined"
                >
                  <v-tooltip activator="parent" location="end" :text="item.measureAbbr ?? ''" />
                  {{ item.measureName }}
                </v-chip>
                <span v-else class="text-disabled">—</span>
              </template>

              <template #item.actions="{ item }">
                <TooltipButton
                  icon="mdi-delete-outline"
                  :text="t('category.features.delete')"
                  color="error"
                  @click="confirmDeleteFeature(item)"
                />
                <TooltipButton
                  icon="mdi-circle-edit-outline"
                  :text="t('category.features.edit')"
                  color="secondary"
                  @click="openFeatureDialog(item)"
                />
              </template>
            </v-data-table>
          </FormCard>
        </v-col>
      </v-row>

      <template #actions>
        <v-btn-custom
          variant="tonal"
          :color="categoryDialogMeta.color"
          @click="closeCategoryDialog"
        >
          {{ t('common.cancel') }}
        </v-btn-custom>
        <v-btn-custom
          variant="elevated"
          :color="categoryDialogMeta.color"
          :loading="state.loadingCategoryDialog"
          :disabled="!state.categoryFormValid"
          @click="saveCategory"
        >
          {{ t('common.save') }}
        </v-btn-custom>
      </template>
    </DialogCard>

    <DialogCard
      v-model="state.dialogFeature"
      :title="featureDialogMeta.title"
      :icon="featureDialogMeta.icon"
      :color="featureDialogMeta.color"
      :loading="state.loadingFeatureDialog"
      :disabled="state.loadingFeatureDialog"
      actions
      @close="closeFeatureDialog"
    >
      <FormCard>
        <v-form v-model="state.featureFormValid">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedFeature.name"
                :label="t('category.features.form.name')"
                :color="featureDialogMeta.color"
                :rules="featureRules.name"
              />
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="editedFeature.idMeasure"
                :label="t('category.features.form.measure')"
                :color="featureDialogMeta.color"
                :items="measureItems"
                item-value="id"
                item-title="name"
                :rules="featureRules.measure"
                chips
              >
                <template #chip="{ props, item }">
                  <v-chip
                    v-bind="props"
                    :color="item.color ?? undefined"
                    :prepend-icon="item.icon ?? undefined"
                    :text="item.name"
                  />
                </template>
                <template #item="{ props, item }">
                  <v-list-item v-bind="props" :title="item.name">
                    <template #prepend>
                      <v-avatar
                        v-if="item.id"
                        variant="tonal"
                        :icon="item.icon ?? undefined"
                        :color="item.color ?? undefined"
                      />
                      <v-avatar v-else variant="tonal" class="font-weight-bold"> N/A </v-avatar>
                    </template>
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" class="text-label-medium text-disabled">
              {{ t('common.requiredFields') }}
            </v-col>
          </v-row>
        </v-form>
      </FormCard>

      <template #actions>
        <v-spacer />
        <v-btn-custom variant="tonal" :color="featureDialogMeta.color" @click="closeFeatureDialog">
          {{ t('common.cancel') }}
        </v-btn-custom>
        <v-btn-custom
          variant="elevated"
          :color="featureDialogMeta.color"
          :disabled="!state.featureFormValid"
          @click="saveFeature"
        >
          {{ t('common.save') }}
        </v-btn-custom>
      </template>
    </DialogCard>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, computed, nextTick, onMounted, reactive } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { createValidators } from '@/shared/utils/validators';
  import TableCard from '@/shared/components/TableCard.vue';
  import IteratorHeader from '@/shared/components/IteratorHeader.vue';
  import DialogCard from '@/shared/components/DialogCard.vue';
  import TooltipButton from '@/shared/components/TooltipButton.vue';
  import FormCard from '@/shared/components/FormCard.vue';
  import { useSwal } from '@/shared/composables/useSwal';
  import type {
    CategoryDetail,
    CategoryInitResponse,
    CategoryLight,
    Feature,
    FeatureWithMeasure,
    MeasureDetail,
  } from '../types/categoryTypes';
  import { categoriesMockData, measuresMockData } from '../MockData';

  const emit = defineEmits<{
    loadingChange: [isLoading: boolean];
  }>();
  const { toast, confirm } = useSwal();
  const { t } = useTypedLocale();
  const { smAndDown } = useDisplay();
  const v = createValidators(t);

  const categoryItems = ref<CategoryLight[]>([]);
  const editedCategoryIndex = ref(-1);

  const state = reactive({
    // Categories
    dialogCategory: false,
    loadingTable: false,
    loadingCategoryDialog: false,
    categorySearch: '',
    categoryFormValid: false,
    // Features
    featureSearch: '',
    featureFormValid: false,
    dialogFeature: false,
    loadingFeatureDialog: false,
  });

  const defaultCategory: CategoryDetail = {
    id: '',
    name: '',
    description: '',
    features: [],
  };
  const editedCategory = ref<CategoryDetail>({ ...defaultCategory });

  const measureItems = ref<MeasureDetail[]>([]);
  const editedFeatureIndex = ref(-1);

  const defaultFeature: Feature = {
    id: '',
    idCategory: '',
    idMeasure: null,
    name: '',
  };
  const editedFeature = ref<Feature>({ ...defaultFeature });

  const categoryHeaders = computed(() => [
    { key: 'name', title: t('category.headers.name') },
    { key: 'description', title: t('category.headers.description'), sortable: false },
    { key: 'actions', title: t('common.actions'), sortable: false, align: 'end' as const },
  ]);

  const featureHeaders = computed(() => [
    { key: 'name', title: t('category.features.headers.name') },
    { key: 'measure', title: t('category.features.headers.measure') },
    { key: 'actions', title: t('common.actions'), sortable: false, align: 'end' as const },
  ]);

  const categoryDialogMeta = computed(() => {
    const isNew = editedCategoryIndex.value === -1;
    return {
      title: isNew ? t('category.dialog.titleNew') : t('category.dialog.titleEdit'),
      icon: isNew ? 'mdi-plus' : 'mdi-circle-edit-outline',
      color: isNew ? 'primary' : 'secondary',
    };
  });

  const featureDialogMeta = computed(() => {
    const isNew = editedFeatureIndex.value === -1;
    return {
      title: isNew
        ? t('category.features.dialog.titleNew')
        : t('category.features.dialog.titleEdit'),
      icon: isNew ? 'mdi-plus' : 'mdi-circle-edit-outline',
      color: isNew ? 'primary' : 'secondary',
    };
  });

  const categoryRules = computed(() => ({
    name: [v.required(), v.maxLength(80, t('category.form.name'))],
    description: [v.required(), v.maxLength(255, t('category.form.description'))],
  }));

  const featureRules = computed(() => ({
    name: [v.required(), v.maxLength(80, t('category.features.form.name'))],
    measure: [],
  }));

  /** Realiza una petición para obtener la categoría con sus características */
  function openCategoryDialog(item?: CategoryLight): void {
    if (item) {
      emit('loadingChange', true);
      setTimeout(() => {
        editedCategoryIndex.value = categoryItems.value.indexOf(item);
        editedCategory.value = { ...categoriesMockData.find(c => c.id === item.id)! };
        emit('loadingChange', false);
        state.dialogCategory = true;
      }, 300);
    } else {
      state.dialogCategory = true;
    }
  }

  function closeCategoryDialog(): void {
    state.dialogCategory = false;
    nextTick(() => {
      editedCategory.value = { ...defaultCategory, features: [] };
      editedCategoryIndex.value = -1;
    });
  }

  function saveCategory(): void {
    state.loadingCategoryDialog = true;
    setTimeout(() => {
      if (editedCategoryIndex.value === -1) {
        categoryItems.value.push({ ...editedCategory.value, id: Date.now().toString() });
      } else {
        Object.assign(categoryItems.value[editedCategoryIndex.value], {
          id: editedCategory.value.id,
          name: editedCategory.value.name,
          description: editedCategory.value.description,
        });
      }
      state.loadingCategoryDialog = false;
      closeCategoryDialog();
    }, 1000);
  }

  /** Elimina una categoría */
  function confirmDeleteCategory(item: CategoryLight): void {
    confirm(
      t('category.dialog.deleteTitle', { name: item.name }),
      'warning',
      t('category.dialog.deleteMessage')
    )
      .then(result => {
        if (result.isConfirmed) {
          categoryItems.value = categoryItems.value.filter(c => c.id !== item.id);
          toast('success', t('category.dialog.successMessage'));
        }
      })
      .catch(() => toast('error', t('category.dialog.errorMessage')));
  }

  /** Ejecuta la petición para las características */
  function openFeatureDialog(item?: FeatureWithMeasure): void {
    if (item) {
      state.loadingFeatureDialog = true;
      setTimeout(() => {
        editedFeatureIndex.value = editedCategory.value.features.indexOf(item);
        editedFeature.value = { ...editedCategory.value.features.find(f => f.id === item.id)! };
        state.loadingFeatureDialog = false;
        state.dialogFeature = true;
      }, 500);
    } else {
      state.dialogFeature = true;
    }
  }

  function closeFeatureDialog(): void {
    state.dialogFeature = false;
    nextTick(() => {
      editedFeature.value = { ...defaultFeature };
      editedFeatureIndex.value = -1;
    });
  }

  function saveFeature(): void {
    state.loadingFeatureDialog = true;
    setTimeout(() => {
      const object = measureItems.value.find(m => m.id === editedFeature.value.idMeasure);

      const feature: FeatureWithMeasure = {
        ...editedFeature.value,
        measureName: object?.name ?? null,
        measureAbbr: object?.abbr ?? null,
        measureIcon: object?.icon ?? null,
        measureColor: object?.color ?? null,
      };

      if (editedFeatureIndex.value === -1) {
        editedCategory.value.features.push({ ...feature, id: Date.now().toString() });
      } else {
        Object.assign(editedCategory.value.features[editedFeatureIndex.value], feature);
      }
      state.loadingFeatureDialog = false;
      closeFeatureDialog();
    }, 1000);
  }

  /** Elimina características de las categorías */
  function confirmDeleteFeature(item: FeatureWithMeasure): void {
    confirm(
      t('category.features.dialog.deleteTitle', { name: item.name }),
      'warning',
      t('category.features.dialog.deleteMessage')
    )
      .then(result => {
        if (result.isConfirmed) {
          editedCategory.value.features = editedCategory.value.features.filter(
            f => f.id !== item.id
          );
          toast('success', t('category.features.dialog.successMessage'));
        }
      })
      .catch(() => toast('error', t('category.features.dialog.errorMessage')));
  }

  /** Inicializa la página con CategoryLight y MeasureDetail */
  function initialize(): void {
    state.loadingTable = true;
    setTimeout(() => {
      // Simula la petición
      const categoryInit: CategoryInitResponse = {
        categoryItems: categoriesMockData.map(u => ({
          id: u.id,
          name: u.name,
          description: u.description,
        })),
        measureItems: measuresMockData,
      };
      categoryItems.value = categoryInit.categoryItems;
      measureItems.value = categoryInit.measureItems;
      state.loadingTable = false;
    }, 1500);
  }
  onMounted(initialize);
</script>
