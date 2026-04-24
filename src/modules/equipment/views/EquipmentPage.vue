<template>
  <v-container fluid>
    <v-row>
      <!-- Resumen -->
      <v-col v-for="item in summary" :key="item.text" cols="12" sm="6" md="6" lg="3" xl="3">
        <SummaryCardV3
          :text="t(item.text as I18nKeys)"
          :number="item.number"
          :icon="item.icon"
          :color="item.color"
          variant="text"
        >
        </SummaryCardV3>
      </v-col>

      <v-col cols="12">
        <TableCard
          icon="mdi-desktop-classic"
          :title="t('equipment.page.title')"
          :subtitle="t('equipment.page.subtitle')"
        >
          <v-row density="compact">
            <v-col cols="12" md="6" lg="8" xl="9">
              <IteratorHeader>
                <v-btn-custom
                  prepend-icon="mdi-plus"
                  :block="smAndDown"
                  @click="openProductDialog()"
                >
                  {{ t('equipment.actions.add') }}
                </v-btn-custom>
              </IteratorHeader>
            </v-col>
            <v-col cols="12" md="6" lg="4" xl="3">
              <IteratorHeader>
                <v-text-field
                  v-model="state.search"
                  :placeholder="t('equipment.search')"
                  single-line
                  hide-details
                  clearable
                  prepend-inner-icon="mdi-magnify"
                />
              </IteratorHeader>
            </v-col>

            <v-col cols="12">
              <v-data-table
                :items="products"
                :headers="productHeaders"
                :search="state.search"
                :loading="state.loadingTable"
              >
                <template #loading>
                  <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
                </template>
                <template #item.barcode="{ value }">
                  <v-chip variant="text">{{ value }}</v-chip>
                </template>

                <template #item.name="{ item }">
                  <div class="font-weight-medium">{{ item.name }}</div>
                  <div class="text-caption">{{ item.description }}</div>
                </template>

                <template #item.category-name="{ value }">
                  <v-chip>{{ value }}</v-chip>
                </template>

                <template #item.status="{ value }">
                  <v-chip :color="productStatusColor(value.toUpperCase())">{{
                    productStatusText(value)
                  }}</v-chip>
                </template>

                <template #item.actions="{ item }">
                  <TooltipButton
                    icon="mdi-circle-edit-outline"
                    :text="t('equipment.actions.edit')"
                    color="secondary"
                    @click="openProductDialog(item)"
                  />
                  <v-menu>
                    <template #activator="{ props }">
                      <TooltipButton
                        :text="t('equipment.actions.more')"
                        icon="mdi-dots-vertical"
                        v-bind="props"
                      />
                    </template>
                    <v-sheet class="pa-2">
                      <v-list class="pa-0" density="comfortable">
                        <v-list-item
                          :title="t('equipment.actions.delete')"
                          prepend-icon="mdi-delete-outline"
                          @click="confirmDeleteProduct(item)"
                        />
                      </v-list>
                    </v-sheet>
                  </v-menu>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </TableCard>
      </v-col>
    </v-row>

    <DialogCard
      v-model="state.dialogProduct"
      :title="productDialogMeta.title"
      :icon="productDialogMeta.icon"
      :loading="state.loadingProductForm"
      :disabled="state.loadingProductForm"
      fullscreen
      actions
      @close="closeProductDialog"
    >
      <v-form v-model="state.productFormValid" @submit.prevent>
        <v-row>
          <!-- Información general -->
          <v-col cols="12">
            <FormCard :title="t('equipment.form.generalInfo')" icon="mdi-card-text-outline">
              <v-row>
                <v-col cols="12" md="4" lg="3">
                  <v-text-field
                    v-model="editedProduct.barcode"
                    :label="t('equipment.form.barcode')"
                    :color="productDialogMeta.color"
                    :rules="productRules.barcode"
                    prepend-inner-icon="mdi-identifier"
                    append-inner-icon="mdi-barcode-scan"
                    @click:append-inner="onScanBarcode"
                  />
                </v-col>
                <v-col cols="12" md="8" lg="3">
                  <v-select
                    v-model="editedProduct.categoryId"
                    :label="t('equipment.form.category')"
                    :color="productDialogMeta.color"
                    :rules="productRules.categoryId"
                    :items="categories"
                    item-value="id"
                    item-title="name"
                    prepend-inner-icon="mdi-tag-multiple-outline"
                  />
                </v-col>
                <v-col cols="12" md="8" lg="6">
                  <v-text-field
                    v-model="editedProduct.name"
                    :label="t('equipment.form.name')"
                    :color="productDialogMeta.color"
                    :rules="productRules.name"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedProduct.shortDescription"
                    :label="t('equipment.form.shortDescription')"
                    :color="productDialogMeta.color"
                    :rules="productRules.shortDescription"
                    prepend-inner-icon="mdi-text-short"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="editedProduct.longDescription"
                    :label="t('equipment.form.longDescription')"
                    :color="productDialogMeta.color"
                    :rules="productRules.longDescription"
                    prepend-inner-icon="mdi-text-long"
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <!-- Precios -->
          <v-col cols="12" sm="6" md="4" lg="4">
            <FormCard :title="t('equipment.form.prices')" icon="mdi-cash">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model.number="editedProduct.purchasePrice"
                    :label="t('equipment.form.purchasePrice')"
                    :color="productDialogMeta.color"
                    :rules="productRules.purchasePrice"
                    prepend-inner-icon="mdi-currency-usd"
                    type="number"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model.number="editedProduct.rentPrice"
                    :label="t('equipment.form.rentPrice')"
                    :color="productDialogMeta.color"
                    :rules="productRules.rentPrice"
                    prepend-inner-icon="mdi-currency-usd"
                    type="number"
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <!-- Stock -->
          <v-col cols="12" sm="6" md="4" lg="4">
            <FormCard :title="t('equipment.form.stock')" icon="mdi-list-box-outline">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model.number="editedProduct.maxStock"
                    :label="t('equipment.form.maxStock')"
                    :color="productDialogMeta.color"
                    :rules="productRules.maxStock"
                    type="number"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model.number="editedProduct.minStock"
                    :label="t('equipment.form.minStock')"
                    :color="productDialogMeta.color"
                    :rules="productRules.minStock"
                    type="number"
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <!-- Disponibilidad -->
          <v-col cols="12" sm="12" md="4" lg="4">
            <FormCard
              :title="t('equipment.form.availability')"
              class="h-100"
              icon="mdi-store-cog-outline"
            >
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="editedProduct.type"
                    :label="t('equipment.form.productOffer')"
                    :color="productDialogMeta.color"
                    :items="productTypeItems"
                    :rules="productRules.type"
                    chips
                    multiple
                  />
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="editedProduct.active"
                    :label="t('equipment.form.active')"
                    :color="productDialogMeta.color"
                    hide-details
                  />
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <!-- Imágenes -->
          <v-col cols="12">
            <FormCard :title="t('equipment.form.images')" icon="mdi-image-outline">
              <ImagePicker />
            </FormCard>
          </v-col>

          <!-- Proveedores -->
          <v-col cols="12">
            <FormCard :title="t('equipment.form.suppliers')" icon="mdi-handshake-outline">
              <v-row>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="suppliersSelected"
                    :label="t('equipment.form.autocompleteSuppliers')"
                    :items="suppliersSelectedByProduct"
                    item-title="supplierName"
                    item-value="id"
                    multiple
                    chips
                  >
                    <template #append>
                      <v-btn
                        icon="mdi-plus"
                        color="tertiary"
                        variant="flat"
                        :disabled="suppliersSelected.length === 0"
                        @click="addSuppliers"
                      ></v-btn>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-data-table :items="editedProduct.suppliers" :headers="supplierHeaders">
                    <template #item.active="{ value }">
                      <v-icon :color="value ? 'success' : 'error'">
                        {{ value ? 'mdi-check' : 'mdi-close' }}
                      </v-icon>
                    </template>
                    <template #item.actions="{ item }">
                      <TooltipButton
                        :text="t('equipment.actions.removeSupplier')"
                        icon="mdi-delete-outline"
                        color="error"
                        @click="deleteSupplierFromProduct(item)"
                      />
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </FormCard>
          </v-col>

          <v-col cols="12" class="text-label-medium text-disabled">
            {{ t('common.requiredFields') }}
          </v-col>
        </v-row>
      </v-form>

      <template #actions>
        <v-btn-custom variant="tonal" :color="productDialogMeta.color" @click="closeProductDialog">
          {{ t('common.cancel') }}
        </v-btn-custom>
        <v-btn-custom
          variant="flat"
          :color="productDialogMeta.color"
          :disabled="!state.productFormValid"
          :loading="state.loadingProductForm"
          @click="saveProduct"
        >
          {{ t('common.save') }}
        </v-btn-custom>
      </template>
    </DialogCard>
    <ScannerPicker
      v-model="state.dialogScanner"
      @detected-code="handleDetectedCode"
      @close="closeScaner"
    />
  </v-container>
</template>

<script setup lang="ts">
  import { ref, computed, reactive, nextTick, onMounted } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { createValidators } from '@/shared/utils/validators';
  import {
    mockProducts,
    mockCategories,
    mockSummary,
    mockProductsDetail,
    mockSuppliers,
  } from '@/modules/equipment/MockData';
  import type {
    ProductForm,
    CategoryResponse,
    SummaryCard,
    ProductLightResponse,
    SupplierLightResponse,
  } from '@/modules/equipment/types/EquipmentTypes';
  import TableCard from '@/shared/components/TableCard.vue';
  import TooltipButton from '@/shared/components/TooltipButton.vue';
  import DialogCard from '@/shared/components/DialogCard.vue';
  import FormCard from '@/shared/components/FormCard.vue';
  import SummaryCardV3 from '@/shared/components/SummaryCardV3.vue';
  import type { I18nKeys } from '@/core/i18n/i18n-keys';
  import IteratorHeader from '@/shared/components/IteratorHeader.vue';
  import ScannerPicker from '@/shared/components/ScannerPicker.vue';
  import { useSwal } from '@/shared/composables/useSwal';
  import ImagePicker from '@/shared/components/ImagePicker.vue';

  const emit = defineEmits<{
    loadingChange: [isLoading: boolean];
  }>();

  const { t } = useTypedLocale();
  const { smAndDown } = useDisplay();
  const v = createValidators(t);
  const { toast, confirm } = useSwal();

  function productStatusColor(status: string): string {
    const map: Record<string, string> = {
      DISPONIBLE: 'success',
      OCUPADO: 'warning',
      SUSPENDIDO: 'error',
      MANTENIMIENTO: 'info',
    };
    return map[status.toUpperCase()] ?? 'default';
  }

  function productStatusText(status: string): string {
    const map: Record<string, string> = {
      DISPONIBLE: t('equipment.status.available'),
      OCUPADO: t('equipment.status.occupied'),
      SUSPENDIDO: t('equipment.status.suspended'),
      MANTENIMIENTO: t('equipment.status.maintenance'),
    };
    return map[status.toUpperCase()] ?? 'default';
  }

  const productTypeItems = ['Venta', 'Renta'];

  const products = ref<ProductLightResponse[]>([]);
  const categories = ref<CategoryResponse[]>([]);
  const summary = ref<SummaryCard[]>([]);
  const suppliers = ref<SupplierLightResponse[]>([]);

  const suppliersSelected = ref<string[]>([]);
  const editedProductIndex = ref(-1);

  const defaultProduct: ProductForm = {
    id: '',
    categoryId: '',
    barcode: '',
    name: '',
    shortDescription: '',
    longDescription: '',
    purchasePrice: 0,
    rentPrice: 0,
    maxStock: 0,
    minStock: 0,
    type: ['Venta'],
    active: true,
    suppliers: [],
  };
  const editedProduct = ref<ProductForm>({ ...defaultProduct });

  const state = reactive({
    // General
    search: '',
    loadingTable: false,
    // Equipo
    dialogProduct: false,
    productFormValid: false,
    loadingProductForm: false,
    // Scanner
    dialogScanner: false,
  });

  const productHeaders = computed(() => [
    { key: 'barcode', title: t('equipment.headers.barcode') },
    { key: 'name', title: t('equipment.headers.name') },
    { key: 'category-name', title: t('equipment.headers.category'), value: 'categoryName' },
    { key: 'stock', title: t('equipment.headers.stock') },
    { key: 'status', title: t('equipment.headers.status') },
    {
      key: 'actions',
      title: t('equipment.headers.actions'),
      sortable: false,
      align: 'end' as const,
    },
  ]);

  const supplierHeaders = computed(() => [
    {
      key: 'supplier-name',
      title: t('equipment.suppliers.headers.supplierName'),
      value: 'supplierName',
    },
    { key: 'name', title: t('equipment.suppliers.headers.name') },
    {
      key: 'mobile-phone',
      title: t('equipment.suppliers.headers.mobilePhone'),
      value: 'mobilePhone',
    },
    { key: 'email', title: t('equipment.suppliers.headers.email') },
    { key: 'active', title: t('equipment.suppliers.headers.status') },
    {
      key: 'actions',
      title: t('equipment.suppliers.headers.actions'),
      sortable: false,
      align: 'end' as const,
    },
  ]);

  const productDialogMeta = computed(() => {
    const isNew = editedProductIndex.value === -1;
    return {
      title: isNew ? t('equipment.dialog.titleNew') : t('equipment.dialog.titleEdit'),
      icon: isNew ? 'mdi-plus' : 'mdi-circle-edit-outline',
      color: isNew ? 'primary' : 'secondary',
    };
  });

  const productRules = computed(() => ({
    name: [v.required(), v.maxLength(30, t('equipment.form.name'))],
    shortDescription: [v.required(), v.maxLength(60, t('equipment.form.shortDescription'))],
    longDescription: [v.required(), v.maxLength(1200, t('equipment.form.longDescription'))],
    barcode: [
      v.required(),
      v.maxLength(10, t('equipment.form.barcode')),
      v.onlyNumbers(t('equipment.form.barcode')),
    ],
    categoryId: [v.required()],
    purchasePrice: [v.required()],
    rentPrice: [v.required()],
    maxStock: [v.required()],
    minStock: [v.required()],
    type: [v.required(), v.requiredLength()],
  }));

  function openProductDialog(item?: ProductLightResponse): void {
    if (item) {
      emit('loadingChange', true);
      setTimeout(() => {
        editedProductIndex.value = products.value.indexOf(item);
        editedProduct.value = { ...mockProductsDetail.find(p => p.id === item.id)! };
        state.dialogProduct = true;
        emit('loadingChange', false);
      }, 300);
    } else {
      state.dialogProduct = true;
    }
  }

  function closeProductDialog(): void {
    state.dialogProduct = false;
    nextTick(() => {
      editedProduct.value = { ...defaultProduct, suppliers: [] };
      editedProductIndex.value = -1;
    });
  }

  function saveProduct(): void {
    state.loadingProductForm = true;
    setTimeout(() => {
      if (editedProductIndex.value === -1) {
        products.value.push({
          id: String(products.value.length + 1),
          categoryId: editedProduct.value.categoryId,
          name: editedProduct.value.name,
          description: editedProduct.value.shortDescription,
          barcode: editedProduct.value.barcode,
          categoryName:
            categories.value.find(c => c.id === editedProduct.value.categoryId)?.name ?? '',
          stock: editedProduct.value.maxStock,
          status: editedProduct.value.active ? 'Disponible' : 'Suspendido',
        });
      } else {
        Object.assign(products.value[editedProductIndex.value], editedProduct.value);
      }
      state.loadingProductForm = false;
      closeProductDialog();
    }, 1000);
  }

  function confirmDeleteProduct(item: ProductLightResponse): void {
    confirm(
      t('equipment.dialog.deleteTitle', { name: item.name }),
      'warning',
      t('equipment.dialog.deleteMessage')
    )
      .then(result => {
        if (result.isConfirmed) {
          products.value = products.value.filter(p => p.id !== item.id);
          toast('success', t('equipment.dialog.successMessage'));
        }
      })
      .catch(() => toast('error', t('equipment.dialog.errorMessage')));
  }

  function onScanBarcode(): void {
    state.dialogScanner = true;
  }

  function closeScaner(): void {
    state.dialogScanner = false;
  }

  function handleDetectedCode(code: string): void {
    editedProduct.value.barcode = code;
    state.dialogScanner = false;
  }

  const suppliersSelectedByProduct = computed(() => {
    return suppliers.value.filter(s => !editedProduct.value.suppliers.some(es => es.id === s.id));
  });

  function deleteSupplierFromProduct(supplier: SupplierLightResponse): void {
    confirm(
      t('equipment.dialog.removeSupplierTitle', { supplierName: supplier.supplierName }),
      'warning',
      t('equipment.dialog.removeSupplierMessage')
    )
      .then(result => {
        if (result.isConfirmed) {
          editedProduct.value.suppliers = editedProduct.value.suppliers.filter(
            s => s.id !== supplier.id
          );
          toast('success', t('equipment.dialog.removeSupplierSuccessMessage'));
        }
      })
      .catch(() => toast('error', t('equipment.dialog.removeSupplierErrorMessage')));
  }

  function addSuppliers(): void {
    console.log(suppliersSelected.value);
    const newSuppliers = suppliers.value.filter(s => suppliersSelected.value.includes(s.id));
    const existingSupplierIds = editedProduct.value.suppliers.map(s => s.id);
    newSuppliers.forEach(s => {
      if (!existingSupplierIds.includes(s.id)) {
        editedProduct.value.suppliers.push({ ...s, idProduct: editedProduct.value.id });
      }
    });
    suppliersSelected.value = [];
  }

  onMounted(() => {
    state.loadingTable = true;
    setTimeout(() => {
      // TODO: reemplazar con llamadas reales al service
      products.value = mockProducts;
      categories.value = mockCategories;
      summary.value = mockSummary;
      state.loadingTable = false;
      suppliers.value = mockSuppliers;
    }, 1000);
  });
</script>
