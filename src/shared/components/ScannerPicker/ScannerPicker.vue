<template>
  <v-card color="background" class="h-100 d-flex flex-column">
    <!-- Area de camara -->
    <div
      ref="wrapperRef"
      :class="{ fullscreen }"
      style="overflow: hidden; aspect-ratio: 1/1; background: #000"
      @fullscreenchange="onFullscreenChange"
    >
      <qrcode-stream
        :paused="paused"
        :torch="torchActive"
        :constraints="selectedConstraints"
        :track="paintCustom"
        :formats="selectedBarcodeFormats"
        @error="onError"
        @detect="onDetect"
        @camera-on="onCameraReady"
      >
        <div
          class="position-absolute bottom-0 right-0 left-0 mb-1 mx-1"
          style="overflow: hidden; z-index: 3"
        >
          <v-tabs v-model="selectedConstraints" align-tabs="center" color="white">
            <v-tab v-for="(item, i) in cameraOptions" :key="i" :value="item.constraints">
              {{ t('scanner.cameraLabel', { index: i + 1 }) }}
            </v-tab>
          </v-tabs>

          <v-alert
            v-if="cameraError"
            color="warning"
            class="mt-2"
            icon="mdi-alert-circle-outline"
            :text="cameraError"
          >
          </v-alert>
        </div>
        <div class="position-absolute right-0 mr-1 mt-1" style="z-index: 3">
          <v-btn
            v-if="torchSupported"
            variant="text"
            color="white"
            icon="mdi-flash-outline"
            @click="torchActive = !torchActive"
          />
          <v-btn
            variant="text"
            color="white"
            :icon="fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
            @click="toggleFullscreen"
          />
        </div>
        <div class="position-absolute ml-1 mt-1" style="z-index: 3">
          <v-btn variant="text" color="white" icon="mdi-close" @click="closeScanner" />
        </div>

        <!-- Animación de escaneo -->
        <div v-if="!loading" class="h-100 w-100 d-flex align-center justify-center overlay pb-4">
          <div class="scanner">
            <div class="corner top-left" :class="{ 'corner-highlight': scanAnimation }" />
            <div class="corner top-right" :class="{ 'corner-highlight': scanAnimation }" />
            <div class="corner bottom-left" :class="{ 'corner-highlight': scanAnimation }" />
            <div class="corner bottom-right" :class="{ 'corner-highlight': scanAnimation }" />
          </div>
        </div>
      </qrcode-stream>

      <!-- ─── Dialog: equipo escaneado ─────────────────────────────── -->
      <v-dialog
        :model-value="dialogEquipment"
        width="500"
        scrollable
        persistent
        :attach="wrapperRef ?? undefined"
        @after-enter="focusQuantity"
      >
        <card-dialog
          icon="mdi-hospital-box-outline"
          :title="t('scanner.dialog.title')"
          @close="closeDialog"
        >
          <card-form>
            <v-form ref="formRef" v-model="formValid" @submit.prevent="addEquipment">
              <v-row dense>
                <v-col cols="12" class="text-center">
                  <v-avatar size="64">
                    <v-img :src="equipmentForm.photoUrl" />
                  </v-avatar>
                  <div class="text-body-1 font-weight-bold text-medium-emphasis my-2">
                    {{ equipmentForm.name }}
                  </div>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    ref="quantityFieldRef"
                    v-model.number="equipmentForm.quantity"
                    :label="t('scanner.dialog.quantity')"
                    type="number"
                    min="1"
                    :rules="formRules.quantity"
                    @keypress="onlyIntegerKeypress"
                  />
                </v-col>

                <v-col cols="12" class="d-flex justify-end flex-wrap ga-2">
                  <btn-custom variant="tonal" @click="closeDialog">
                    {{ t('scanner.dialog.cancel') }}
                  </btn-custom>
                  <btn-custom type="submit" :disabled="!formValid">
                    {{ t('scanner.dialog.add') }}
                  </btn-custom>
                </v-col>
              </v-row>
            </v-form>
          </card-form>
        </card-dialog>
      </v-dialog>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { ref, computed, watch, nextTick } from 'vue';
  import { QrcodeStream } from 'vue-qrcode-reader';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import { createValidators } from '@/shared/utils/validators';
  //import { fakeApiGetUser } from '@/services/equipment.service'; // reemplaza fakeApi
  import beepSound from '@/assets/audio/beep.mp3';
  import type {
    BarcodeFormats,
    DetectedCode,
    CameraOption,
    EquipmentForm,
    AddEquipmentPayload,
    CameraCapabilities,
  } from '@/shared/types/ScannerPickerTypes';

  // ─── i18n y validators ───────────────────────────────────────────────

  const { t } = useTypedLocale();
  const v = createValidators(t);

  // ─── Emits ───────────────────────────────────────────────────────────

  const emit = defineEmits<{
    addEquipment: [payload: AddEquipmentPayload];
    closeScanner: [];
  }>();

  // ─── Refs de template ────────────────────────────────────────────────

  const wrapperRef = ref<HTMLElement | null>(null);
  const formRef = ref();
  const quantityFieldRef = ref<{ focus: () => void; select: () => void } | null>(null);

  // ─── Estado: escáner ─────────────────────────────────────────────────

  const paused = ref(false);
  const loading = ref(true);
  const scanAnimation = ref(false);
  const cameraError = ref('');
  const scannedCode = ref('');

  // ─── Estado: linterna ────────────────────────────────────────────────

  const torchActive = ref(false);
  const torchSupported = ref(false);

  // ─── Estado: pantalla completa ───────────────────────────────────────

  const fullscreen = ref(false);

  watch(fullscreen, enter => {
    if (enter) requestFullscreen();
    else exitFullscreen();
  });

  // ─── Estado: formulario de equipo ────────────────────────────────────

  const formValid = ref(false);
  const dialogEquipment = ref(false);

  const defaultEquipmentForm: EquipmentForm = {
    productId: '',
    name: '',
    photoUrl: '',
    quantity: 1,
  };
  const equipmentForm = ref<EquipmentForm>({ ...defaultEquipmentForm });

  const formRules = computed(() => ({
    quantity: [
      v.required(),
      v.onlyNumbers(t('scanner.dialog.quantity')),
      v.minNumber(1, t('scanner.dialog.quantity')),
      v.maxNumber(30, t('scanner.dialog.quantity')),
    ],
  }));

  // ─── Estado: cámara y formatos ───────────────────────────────────────

  const selectedConstraints = ref<CameraOption['constraints']>({ facingMode: 'environment' });

  const cameraOptions = ref<CameraOption[]>([
    { label: 'rear camera', constraints: { facingMode: 'environment' } },
    { label: 'front camera', constraints: { facingMode: 'user' } },
  ]);

  const barcodeFormats = ref<BarcodeFormats>({
    code_128: true,
    code_39: true,
    code_93: false,
    codabar: false,
    data_matrix: true,
    ean_13: true,
    ean_8: false,
    itf: true,
    pdf417: false,
    qr_code: true,
    upc_a: true,
    upc_e: false,
  });

  const selectedBarcodeFormats = computed(() =>
    (Object.keys(barcodeFormats.value) as (keyof BarcodeFormats)[]).filter(
      format => barcodeFormats.value[format]
    )
  );

  // ─── Audio ───────────────────────────────────────────────────────────

  const audioScanner = new Audio(beepSound);

  // ─── Fullscreen ───────────────────────────────────────────────────────

  function toggleFullscreen(): void {
    fullscreen.value = !fullscreen.value;
  }

  type FullscreenElement = HTMLElement & {
    mozRequestFullScreen?: () => Promise<void> | void;
    webkitRequestFullscreen?: () => Promise<void> | void;
    msRequestFullscreen?: () => Promise<void> | void;
  };

  type FullscreenDocument = Document & {
    mozCancelFullScreen?: () => Promise<void> | void;
    webkitExitFullscreen?: () => Promise<void> | void;
    msExitFullscreen?: () => Promise<void> | void;
  };

  function requestFullscreen(): void {
    const el = wrapperRef.value as FullscreenElement | null;
    if (!el) return;

    const fn =
      el.requestFullscreen ??
      el.mozRequestFullScreen ??
      el.webkitRequestFullscreen ??
      el.msRequestFullscreen;

    fn?.call(el);
  }

  function exitFullscreen(): void {
    const doc = document as FullscreenDocument;

    const fn =
      doc.exitFullscreen ??
      doc.mozCancelFullScreen ??
      doc.webkitExitFullscreen ??
      doc.msExitFullscreen;

    fn?.call(doc);
  }

  function onFullscreenChange(): void {
    // Sincroniza el estado cuando el usuario sale con ESC o botón físico
    fullscreen.value = document.fullscreenElement !== null;
  }

  // ─── Cámara ───────────────────────────────────────────────────────────
  async function onCameraReady(capabilities: Partial<CameraCapabilities>): Promise<void> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(({ kind }) => kind === 'videoinput');
      cameraOptions.value = videoDevices.map(({ deviceId, label }) => ({
        label: label || `Device ${deviceId.slice(0, 6)}`,
        constraints: { deviceId },
      }));
      torchSupported.value = capabilities.torch === true;
      cameraError.value = '';
    } catch (err) {
      cameraError.value = err instanceof Error ? err.message : String(err);
    } finally {
      loading.value = false;
    }
  }

  function onError(err: Error): void {
    const errorMap: Record<string, string> = {
      NotAllowedError: t('scanner.errors.notAllowed'),
      NotFoundError: t('scanner.errors.notFound'),
      NotSupportedError: t('scanner.errors.notSupported'),
      InsecureContextError: t('scanner.errors.notSupported'),
      NotReadableError: t('scanner.errors.notReadable'),
      OverconstrainedError: t('scanner.errors.overconstrained'),
      StreamApiNotSupportedError: t('scanner.errors.streamApi'),
    };
    cameraError.value = errorMap[err.name] ?? t('scanner.errors.generic');
  }

  // ─── Detección ────────────────────────────────────────────────────────

  async function onDetect([firstDetectedCode]: DetectedCode[]): Promise<void> {
    scannedCode.value = firstDetectedCode.rawValue.trim();
    paused.value = true;
    scanAnimation.value = true;
    audioScanner.play();

    try {
      //const result = await fakeApiGetUser(scannedCode.value);
      //equipmentForm.value = { ...result, quantity: 1 };
      dialogEquipment.value = true;
    } catch {
      // Notificación inline en lugar de plugin global
      cameraError.value = t('scanner.errors.codeNotFound');
      paused.value = false;
    } finally {
      scanAnimation.value = false;
      scannedCode.value = '';
    }
  }

  // ─── Track personalizado ──────────────────────────────────────────────

  function paintCustom(detectedCodes: DetectedCode[], ctx: CanvasRenderingContext2D): void {
    for (const {
      boundingBox: { x, y, width, height },
    } of detectedCodes) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.strokeRect(x, y, width, height);
    }
  }

  // ─── Formulario ───────────────────────────────────────────────────────

  /**
   * Bloquea caracteres no enteros en el campo de cantidad.
   * Solo permite dígitos — sin punto decimal ni signo negativo.
   */
  function onlyIntegerKeypress(event: KeyboardEvent): void {
    if (!/^\d$/.test(event.key)) event.preventDefault();
  }

  async function focusQuantity(): Promise<void> {
    await nextTick();
    quantityFieldRef.value?.focus();
    quantityFieldRef.value?.select();
  }

  function addEquipment(): void {
    const payload: AddEquipmentPayload = {
      id: crypto.randomUUID(), // nativo, reemplaza $randomUUID()
      productId: equipmentForm.value.productId,
      name: equipmentForm.value.name,
      quantity: equipmentForm.value.quantity,
      codeValid: true,
    };
    emit('addEquipment', payload);
    closeDialog();
  }

  function closeDialog(): void {
    dialogEquipment.value = false;
    paused.value = false;
    nextTick(() => {
      equipmentForm.value = { ...defaultEquipmentForm };
    });
  }

  function closeScanner(): void {
    emit('closeScanner');
  }
</script>

<style scoped>
  .fullscreen {
    position: fixed;
    z-index: 5000;
    inset: 0;
  }

  .overlay {
    position: absolute;
  }

  .overlay::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 70%;
    transform: translate(-50%, -50%);
    margin-top: -8px;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
    border-radius: 24px;
    z-index: 1;
    overflow: hidden;
  }

  .scanner {
    position: absolute;
    width: 80%;
    height: 70%;
    overflow: hidden;
  }

  .corner {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.6);
  }

  .top-left {
    top: 0;
    left: 0;
    border-right: none;
    border-bottom: none;
    border-radius: 24px 0 0 0;
  }
  .top-right {
    top: 0;
    right: 0;
    border-left: none;
    border-bottom: none;
    border-radius: 0 24px 0 0;
  }
  .bottom-left {
    bottom: 0;
    left: 0;
    border-right: none;
    border-top: none;
    border-radius: 0 0 0 24px;
  }
  .bottom-right {
    bottom: 0;
    right: 0;
    border-left: none;
    border-top: none;
    border-radius: 0 0 24px 0;
  }

  .corner-highlight {
    animation: cornerFlash 0.3s ease-out;
  }

  @keyframes cornerFlash {
    0%,
    100% {
      width: 50px;
      height: 50px;
    }
    50% {
      width: 0;
      height: 0;
    }
  }
</style>
