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
    <v-card :rounded="isCompact ? '0' : 'lg'">
      <!-- Area de camara -->
      <div
        ref="wrapperRef"
        :class="{ fullscreen: isFullscreen }"
        style="overflow: hidden; aspect-ratio: 2/3; background: #000"
        @fullscreenchange="onFullscreenChange"
      >
        <div
          class="position-absolute bottom-0 right-0 left-0 mb-1 mx-1"
          style="overflow: hidden; z-index: 3"
        >
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
            :icon="isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
            @click="toggleFullscreen"
          />
        </div>
        <div class="position-absolute ml-1 mt-1" style="z-index: 3">
          <v-btn variant="text" color="white" icon="mdi-close" @click="emit('close')" />
        </div>
        <qrcode-stream
          :paused="paused"
          :torch="torchActive"
          :constraints="selectedConstraints"
          :formats="selectedBarcodeFormats"
          @error="onError"
          @detect="onDetect"
          @camera-on="onCameraReady"
        >
          <!-- Animación de escaneo -->
          <div v-if="!loading" class="h-100 w-100 d-flex align-center justify-center overlay pb-4">
            <div class="scanner">
              <div class="corner top-left" />
              <div class="corner top-right" />
              <div class="corner bottom-left" />
              <div class="corner bottom-right" />
            </div>
          </div>
        </qrcode-stream>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { QrcodeStream } from 'vue-qrcode-reader';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import beepSound from '@/assets/audio/beep.mp3';
  import type {
    BarcodeFormats,
    DetectedCode,
    CameraOption,
    CameraCapabilities,
  } from '@/shared/types/ScannerPickerTypes';
  import { useDisplay } from 'vuetify';

  // ─── i18n y validators ───────────────────────────────────────────────

  const { t } = useTypedLocale();
  const props = withDefaults(
    defineProps<{
      modelValue: boolean;
      fullscreen?: boolean;
      width?: string;
    }>(),
    {
      width: '500',
      fullscreen: false,
    }
  );
  const { smAndDown } = useDisplay();

  const isCompact = computed(() => props.fullscreen || smAndDown.value);

  // ─── Emits ───────────────────────────────────────────────────────────

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'close'): void;
    (e: 'detectedCode', value: string): void;
  }>();

  // ─── Refs de template ────────────────────────────────────────────────

  const wrapperRef = ref<HTMLElement | null>(null);

  // ─── Estado: escáner ─────────────────────────────────────────────────

  const paused = ref(false);
  const loading = ref(true);
  const cameraError = ref('');
  const scannedCode = ref('');

  // ─── Estado: linterna ────────────────────────────────────────────────

  const torchActive = ref(false);
  const torchSupported = ref(false);

  // ─── Estado: pantalla completa ───────────────────────────────────────

  const isFullscreen = ref(false);

  watch(isFullscreen, enter => {
    if (enter) requestFullscreen();
    else exitFullscreen();
  });

  // ─── Estado: cámara y formatos ───────────────────────────────────────

  const selectedConstraints = ref<CameraOption['constraints']>({ facingMode: 'environment' });

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
    isFullscreen.value = !isFullscreen.value;
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
    isFullscreen.value = document.fullscreenElement !== null;
  }

  // ─── Cámara ───────────────────────────────────────────────────────────
  async function onCameraReady(capabilities: Partial<CameraCapabilities>): Promise<void> {
    try {
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
    audioScanner.play();

    try {
      //const result = await fakeApiGetUser(scannedCode.value);
      //equipmentForm.value = { ...result, quantity: 1 };
      emit('detectedCode', scannedCode.value);
    } catch {
      // Notificación inline en lugar de plugin global
      cameraError.value = t('scanner.errors.codeNotFound');
      paused.value = false;
    } finally {
      scannedCode.value = '';
    }
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
</style>
