<template>
  <v-container fluid>
    <TableCard
      icon="mdi-elevator-down"
      :title="t('inbound.page.title')"
      :subtitle="t('inbound.page.subtitle')"
    >
      <v-row density="compact">
        <v-col cols="12" sm="12" md="6" lg="8" xl="9">
          <IteratorHeader>
            <v-btn-custom prepend-icon="mdi-plus" :block="smAndDown" @click="openInbound()"
              >Nueva Entrada</v-btn-custom
            >
          </IteratorHeader>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4" xl="3">
          <IteratorHeader>
            <v-text-field
              v-model="state.search"
              :placeholder="t('inbound.search')"
              single-line
              hide-details
              clearable
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </IteratorHeader>
        </v-col>
        <v-col cols="12">
          <v-data-table
            :items="inboundItems"
            :headers="inboundHeaders"
            :search="state.search"
            :loading="state.loadingTable"
          >
            <template #loading>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template #item.folio="{ value }">
              <v-chip variant="text">{{ value }}</v-chip>
            </template>
            <template #item.inboundType="{ value }">
              <v-chip :prepend-icon="inboundTypeIcon(value)">{{ value }}</v-chip>
            </template>
            <template #item.invoiceAmount="{ value }">
              <v-icon icon="mdi-cash" color="success" class="mr-2"></v-icon>
              <span>{{ `$ ${value}` }}</span>
            </template>
            <template #item.actions="{ item }">
              <TooltipButton
                icon="mdi-open-in-new"
                :text="t('inbound.actions.expand')"
                color="secondary"
                @click="openInbound(item)"
              ></TooltipButton>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </TableCard>
    <DialogCard
      v-model="state.dialogInbound"
      fullscreen
      :icon="inboundDialogMeta.icon"
      :title="inboundDialogMeta.title"
      @close="closeInboundDialog()"
    >
      <v-form v-model="state.validForm" @submit.prevent>
        <v-row>
          <v-col cols="12">
            <FormCard icon="mdi-elevator-down" title="Recepción de Equipo">
              <v-row>
                <v-col cols="12" sm="12" md="2" lg="2" xl="2">
                  <v-text-field
                    v-model="editedInbound.folio"
                    :label="t('inbound.form.folio')"
                    hint="No editable"
                    prepend-inner-icon="mdi-identifier"
                    :counter="false"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="2" offset-md="8" lg="2" xl="2">
                  <v-text-field
                    v-model="editedInbound.datetime"
                    type="datetime-local"
                    :label="t('inbound.form.datetime')"
                    hint="No editable"
                    prepend-inner-icon="mdi-calendar-outline"
                    :counter="false"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                  <v-select
                    v-model="editedInbound.inboundType"
                    :label="t('inbound.form.inboundType')"
                    :items="inboundType"
                    :rules="inboundRules.inboundType"
                    :readonly="isEditing"
                    @update:model-value="handleInputType"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                  <template v-if="editedInbound.inboundType === 'TRANSFER'">
                    <v-select
                      v-model="editedInbound.originLocationId"
                      :label="t('inbound.form.originLocation')"
                      prepend-inner-icon="mdi-map-marker-outline"
                      :items="locationOrigins"
                      item-value="id"
                      item-title="name"
                      :rules="inboundRules.originLocation"
                      :readonly="isEditing"
                    ></v-select>
                  </template>
                  <template v-else-if="editedInbound.inboundType === 'PURCHASE'">
                    <v-select
                      v-model="editedInbound.supplierId"
                      :label="t('inbound.form.supplier')"
                      prepend-inner-icon="mdi-handshake-outline"
                      :items="suppliers"
                      item-value="id"
                      item-title="name"
                      :rules="inboundRules.supplier"
                      :readonly="isEditing"
                    ></v-select>
                  </template>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                  <v-text-field
                    v-model="editedInbound.invoiceAmount"
                    :label="t('inbound.form.invoiceAmount')"
                    inputmode="decimal"
                    prepend-inner-icon="mdi-cash"
                    prefix="$"
                    :disabled="editedInbound.inboundType !== 'PURCHASE'"
                    :rules="inboundRules.invoiceAmount"
                    :readonly="isEditing"
                    :counter="false"
                    @keydown="validateNumberInput($event, editedInbound.invoiceAmount)"
                    @input="handleInvoiceAmountInput"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <v-textarea
                    v-model="editedInbound.note"
                    :label="t('inbound.form.note')"
                    prepend-inner-icon="mdi-text-long"
                    :rules="inboundRules.note"
                    :readonly="isEditing"
                  ></v-textarea>
                </v-col>
              </v-row>
            </FormCard>
          </v-col>
          <v-col cols="12">
            <FormCard icon="mdi-hospital-box-outline" title="Equipo a Recibir">
              <v-data-table
                :items="editedInbound.equipment"
                :headers="tableHeaders"
                items-per-page="-1"
                hide-default-footer
                fixed-header
              >
                <template #item.barcode="{ index }">
                  <v-text-field
                    :ref="el => setInputRef(index, 'barcode', el)"
                    v-model="editedInbound.equipment[index].barcode"
                    density="compact"
                    base-color="surface"
                    placeholder="Código de barras"
                    hide-details
                    :rules="tableRules.barcode"
                    :prepend-icon="
                      editedInbound.equipment[index].codeValid
                        ? 'mdi-check-circle-outline'
                        : 'mdi-alert-circle-outline'
                    "
                    @keydown.enter="handleEnter($event, index, 'barcode')"
                    @keydown.tab="handleEnter($event, index, 'barcode')"
                  >
                  </v-text-field>
                </template>
                <template #item.quantity="{ index }">
                  <v-text-field
                    :ref="el => setInputRef(index, 'quantity', el)"
                    v-model="editedInbound.equipment[index].quantity"
                    base-color="surface"
                    placeholder="Cantidad"
                    type="number"
                    min="1"
                    density="compact"
                    hide-details
                    :rules="tableRules.quantity"
                    @keydown.enter="handleEnterStock($event, index)"
                    @keydown.tab="handleEnterStock($event, index)"
                    @keypress="onlyIntegerNumbers"
                  ></v-text-field>
                </template>
                <template #item.actions="{ item }">
                  <TooltipButton
                    icon="mdi-delete-outline"
                    text="Descartar entrada"
                    color="error"
                    :disabled="isEditing"
                    @click="deleteEquipment(item)"
                  ></TooltipButton>
                </template>
              </v-data-table>
            </FormCard>
          </v-col>
          <v-col v-if="!isEditing" cols="12">
            <v-btn-custom :disabled="!isValidForm">Generar Entrada</v-btn-custom>
          </v-col>
        </v-row>
      </v-form>
      <v-tooltip v-if="!isEditing" text="Escanear Equipo">
        <template #activator="{ props: activatorProps }">
          <v-btn
            icon="mdi-barcode-scan"
            color="primary"
            size="x-large"
            rounded="circle"
            style="z-index: 1000; position: fixed; right: 16px; bottom: 16px"
            v-bind="activatorProps"
            @click="openScanner()"
          ></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip v-if="!isEditing" text="Agregar Equipo Manualmente">
        <template #activator="{ props: activatorProps }">
          <v-btn
            icon="mdi-plus"
            color="secondary"
            size="x-large"
            rounded="circle"
            style="z-index: 1000; position: fixed; right: 90px; bottom: 16px"
            v-bind="activatorProps"
            @click="createNewRegister()"
          ></v-btn>
        </template>
      </v-tooltip>
      <ScannerPicker
        v-model="state.dialogScanner"
        @detected-code="handleScanner"
        @close="closeScanner"
      ></ScannerPicker>
    </DialogCard>
  </v-container>
</template>
<script setup lang="ts">
  import TableCard from '@/shared/components/TableCard.vue';
  import DialogCard from '@/shared/components/DialogCard.vue';
  import FormCard from '@/shared/components/FormCard.vue';
  import TooltipButton from '@/shared/components/TooltipButton.vue';
  import IteratorHeader from '@/shared/components/IteratorHeader.vue';
  import ScannerPicker from '@/shared/components/ScannerPicker.vue';
  import { useSwal } from '@/shared/composables/useSwal';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { createValidators } from '@/shared/utils/validators';
  import { computed, nextTick, onMounted, reactive, ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import type {
    EquipmentScanner,
    InboundForm,
    InboundLightResponse,
    LocationLightResponse,
    SupplierLightResponse,
  } from '../types/InboundTypes';
  import {
    mockEquipmentProducts,
    mockInbounds,
    mockLocationsLight,
    mockSuppliersLight,
  } from '../MockData';
  import {
    formatCurrencyValue,
    onlyIntegerNumbers,
    validateNumberInput,
  } from '@/shared/utils/helpers';
  import { useTableFocus } from '@/shared/composables/useTableFocus';

  const emit = defineEmits<{
    loadingChange: [isLoading: boolean];
  }>();

  function inboundTypeIcon(inboundType: string): string {
    const map: Record<string, string> = {
      PURCHASE: 'mdi-handshake-outline',
      TRANSFER: 'mdi-map-marker-outline',
    };
    return map[inboundType] ?? 'default';
  }

  const mapInboundToLight = (inbound: InboundForm): InboundLightResponse => {
    return {
      id: inbound.id,
      folio: inbound.folio,
      datetime: inbound.datetime,
      inboundType: inbound.inboundType,
      invoiceAmount: inbound.invoiceAmount,
    };
  };

  const { t } = useTypedLocale();
  const { smAndDown } = useDisplay();
  const v = createValidators(t);
  const { toast } = useSwal();
  const { setInputRef, focusInput } = useTableFocus();

  const state = reactive({
    search: '',
    dialogInbound: false,
    dialogScanner: false,
    loadingTable: false,
    loadingOverlay: false,
    validForm: false,
  });
  const inboundItems = ref<InboundLightResponse[]>([]);
  const defaultInbound: InboundForm = {
    id: '',
    folio: '',
    inboundType: 'PURCHASE',
    datetime: '',
    invoiceAmount: '',
    originLocationId: '',
    supplierId: '',
    note: '',
    equipment: [],
  };
  const editedInbound = ref<InboundForm>({ ...defaultInbound });
  const editedInboundIndex = ref(-1);

  const inboundRules = computed(() => ({
    inboundType: [v.required()],
    invoiceAmount: [v.required()],
    note: [v.maxLength(300)],
    originLocation: [v.required()],
    supplier: [v.required()],
  }));

  const tableRules = computed(() => ({
    barcode: [v.required(), v.maxLength(15)],
    quantity: [v.required(), v.minNumber(1), v.maxNumber(30)],
  }));

  const inboundHeaders = computed(() => [
    { key: 'folio', title: t('inbound.headers.folio'), sortable: false },
    { key: 'inboundType', title: t('inbound.headers.inboundType'), sortable: false },
    { key: 'datetime', title: t('inbound.headers.datetime'), sortable: false },
    { key: 'invoiceAmount', title: t('inbound.headers.invoiceAmount'), sortable: false },
    {
      key: 'actions',
      title: t('inbound.headers.actions'),
      sortable: false,
      align: 'end' as const,
      width: '40',
    },
  ]);

  const tableHeaders = computed(() => [
    {
      key: 'barcode',
      title: t('inbound.form.headers.barcode'),
      value: 'barcode',
      sortable: false,
      width: '300',
    },
    { key: 'name', title: t('inbound.form.headers.name'), sortable: false },
    { key: 'quantity', title: t('inbound.form.headers.quantity'), sortable: false, width: '200' },
    {
      key: 'actions',
      title: t('inbound.form.headers.actions'),
      sortable: false,
      align: 'center' as const,
      width: '40',
    },
  ]);

  const inboundType = computed(() => [
    { value: 'TRANSFER', title: t('inbound.type.transfer') },
    { value: 'PURCHASE', title: t('inbound.type.purchase') },
  ]);

  const suppliers: SupplierLightResponse[] = [...mockSuppliersLight];
  const locationOrigins: LocationLightResponse[] = [...mockLocationsLight];

  const isEditing = computed(() => editedInboundIndex.value !== -1);

  const inboundDialogMeta = computed(() => {
    return {
      title: isEditing.value ? t('inbound.dialog.titleEdit') : t('inbound.dialog.titleNew'),
      icon: isEditing.value ? 'mdi-circle-edit-outline' : 'mdi-plus',
      color: isEditing.value ? 'secondary' : 'primary',
    };
  });

  const isValidForm = computed(() => {
    const length = editedInbound.value.equipment.length > 0;
    let codeValid = false;
    if (length) {
      codeValid = editedInbound.value.equipment.every(i => i.codeValid === true);
    }
    return state.validForm && length && codeValid;
  });

  const closeInboundDialog = () => {
    state.dialogInbound = false;
    nextTick(() => {
      editedInbound.value = Object.assign({}, defaultInbound);
      editedInboundIndex.value = -1;
    });
  };

  const createNewRegister = () => {
    const newRegister: EquipmentScanner = {
      productId: '',
      barcode: '',
      name: '',
      quantity: 1,
      codeValid: false,
    };
    editedInbound.value.equipment.push(newRegister);
  };

  const handleEnter = async (e: Event, index: number, field: string) => {
    e.preventDefault();
    if (field === 'barcode') {
      const barcode = editedInbound.value.equipment[index].barcode;
      if (!barcode) return;
      const equipmentScanner: EquipmentScanner | undefined = mockEquipmentProducts.find(
        m => m.barcode === barcode
      );
      if (!equipmentScanner) {
        toast('warning', 'Equipo no encontrado');
        return;
      }
      editedInbound.value.equipment[index] = { ...equipmentScanner, quantity: 1 };
      await focusInput(index, 'quantity');
    }
  };

  const handleEnterStock = async (e: KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      if (editedInbound.value.equipment.length === index + 1) {
        createNewRegister();
      }
      e.preventDefault();
      await focusInput(index + 1, 'barcode');
    }
  };

  const handleInputType = () => {
    editedInbound.value.invoiceAmount = '0';
    editedInbound.value.supplierId = '';
    editedInbound.value.originLocationId = '';
  };

  const openScanner = () => {
    state.dialogScanner = true;
  };

  const closeScanner = () => {
    state.dialogScanner = false;
  };

  const deleteEquipment = (item: EquipmentScanner) => {
    editedInbound.value.equipment = editedInbound.value.equipment.filter(
      i => i.barcode !== item.barcode
    );
    toast('success', 'Entrada descartada');
  };

  const initialize = () => {
    inboundItems.value = mockInbounds.map(mapInboundToLight);
    suppliers.push(...mockSuppliersLight);
    state.loadingTable = true;
    setTimeout(() => {
      state.loadingTable = false;
    }, 1000);
  };
  const openInbound = (item?: InboundLightResponse): void => {
    if (item) {
      emit('loadingChange', true);
      setTimeout(() => {
        editedInboundIndex.value = inboundItems.value.indexOf(item);
        editedInbound.value = { ...mockInbounds.find(i => i.id === item.id)! };
        state.dialogInbound = true;
        emit('loadingChange', false);
      }, 1000);
    } else {
      state.dialogInbound = true;
    }
  };

  const handleInvoiceAmountInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    editedInbound.value.invoiceAmount = formatCurrencyValue(input.value);
  };

  const handleScanner = (barcode: string) => {
    if (!barcode) return;
    const equipmentScanner: EquipmentScanner | undefined = mockEquipmentProducts.find(
      m => m.barcode === barcode
    );
    if (!equipmentScanner) {
      toast('warning', 'Equipo no encontrado');
      return;
    }
    editedInbound.value.equipment.push({ ...equipmentScanner, quantity: 1 });
  };

  onMounted(initialize);
</script>
