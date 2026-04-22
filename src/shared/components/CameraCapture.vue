<!--
  @file shared/components/CameraCapture.vue

  Emits:
    capture(file: File)  — foto capturada
    close()              — usuario cerró la cámara
-->
<template>
  <v-theme-provider theme="dark">
    <v-card color="background" class="h-100 d-flex flex-column">
      <v-alert
        v-if="cameraError"
        icon="mdi-information-outline"
        color="warning"
        class="position-absolute left-0 right-0 mt-2 mx-2 text-body-2"
        closable
        @click:close="cameraError = ''"
        >{{ cameraError }}</v-alert
      >

      <v-btn
        v-if="flashSupported"
        variant="text"
        :icon="flashEnabled ? 'mdi-flash' : 'mdi-flash-outline'"
        class="position-absolute mt-2 ml-2"
        style="z-index: 3"
        :title="t('imagePicker.camera.flash')"
        @click="toggleFlash"
      />

      <div class="bg-background" style="overflow: hidden">
        <video
          ref="videoRef"
          autoplay
          playsinline
          muted
          class="w-100 h-100"
          style="object-fit: contain"
        />
        <canvas ref="canvasRef" class="d-none" />
      </div>

      <v-tabs
        v-if="zoomSupported"
        v-model="currentZoom"
        align-tabs="center"
        class="position-relative mt-n16"
        style="z-index: 2"
        @update:model-value="applyZoom"
      >
        <v-tab :value="1">1X</v-tab>
        <v-tab :value="1.5">1.5X</v-tab>
        <v-tab :value="2">2X</v-tab>
      </v-tabs>

      <div class="mx-2 mb-2">
        <v-tabs v-model="selectedCamera" align-tabs="center">
          <v-tab v-for="(cam, i) in cameraOptions" :key="cam.value" :value="cam.value">
            {{ t('imagePicker.camera.label', { index: i + 1 }) }}
          </v-tab>
        </v-tabs>

        <div class="d-flex justify-space-around align-center mt-4">
          <v-avatar
            size="large"
            color="surface"
            style="cursor: pointer"
            :title="t('imagePicker.camera.save')"
            @click="saveImage"
          >
            <v-img v-if="previewSrc" :src="previewSrc" />
          </v-avatar>

          <v-btn
            icon
            size="80"
            rounded="circle"
            :title="t('imagePicker.camera.capture')"
            @click="capturePhoto"
          >
            <v-icon icon="mdi-circle" size="72" />
          </v-btn>

          <v-btn
            icon="mdi-close"
            :title="t('imagePicker.camera.close')"
            variant="text"
            @click="closeCamera"
          />
        </div>
      </div>
    </v-card>
  </v-theme-provider>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
  import { useTypedLocale } from '@/shared/composables/useTypedLocale';
  import type { CameraOption } from '@/shared/types/ImagePickerTypes';
  import type { CameraAdvancedSettings, TrackCapabilitiesExt } from '../types/CameraCaptureTypes';

  const { t } = useTypedLocale();

  const emit = defineEmits<{
    (e: 'capture', file: File): void;
    (e: 'close'): void;
  }>();

  const videoRef = ref<HTMLVideoElement | null>(null);
  const canvasRef = ref<HTMLCanvasElement | null>(null);

  const cameraOptions = ref<CameraOption[]>([]);
  const selectedCamera = ref('');
  const streamStarted = ref(false);
  const cameraError = ref('');
  const previewSrc = ref('');
  const flashEnabled = ref(false);
  const flashSupported = ref(false);
  const zoomSupported = ref(false);
  const currentZoom = ref(1);

  watch(selectedCamera, val => {
    if (val) startStream();
  });

  async function initCameras(): Promise<void> {
    try {
      if (!navigator.mediaDevices?.enumerateDevices) {
        cameraError.value = t('imagePicker.camera.errors.notSupported');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
        },
      });
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(d => d.kind === 'videoinput');

      stream.getTracks().forEach(track => track.stop());
      if (!videoDevices.length) {
        cameraError.value = t('imagePicker.camera.errors.noDevices');
        return;
      }
      cameraOptions.value = videoDevices.map((d, i) => ({
        label: d.label || `Camera ${i + 1}`,
        value: d.deviceId,
      }));
      selectedCamera.value = cameraOptions.value[0].value;
    } catch {
      cameraError.value = t('imagePicker.camera.errors.fetchDevices');
    }
  }

  async function stopStream(): Promise<void> {
    const stream = videoRef.value?.srcObject as MediaStream | null;
    stream?.getTracks().forEach(t => t.stop());
    if (videoRef.value) videoRef.value.srcObject = null;
    streamStarted.value = false;
    flashEnabled.value = false;
    flashSupported.value = false;
    zoomSupported.value = false;
    currentZoom.value = 1;
    previewSrc.value = '';
    cameraError.value = '';
  }

  async function startStream(): Promise<void> {
    try {
      await stopStream();
      if (!navigator.mediaDevices?.getUserMedia) {
        cameraError.value = t('imagePicker.camera.errors.notSupported');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: selectedCamera.value ? { exact: selectedCamera.value } : undefined,
          facingMode: selectedCamera.value ? undefined : { ideal: 'environment' },
          width: { ideal: 1920, min: 640 },
          height: { ideal: 1280, min: 480 },
          // @ts-expect-error: focusMode is not yet part of the standard MediaTrackConstraints interface
          focusMode: 'continuous',
        },
      });
      if (!videoRef.value) return;
      videoRef.value.srcObject = stream;
      streamStarted.value = true;
      cameraError.value = '';

      const track = stream.getVideoTracks()[0];
      checkZoomSupport(track);
      checkFlashSupport(track);
    } catch (err) {
      cameraError.value =
        (err as Error).name === 'NotAllowedError'
          ? t('imagePicker.camera.errors.permissionDenied')
          : t('imagePicker.camera.errors.startStream');
    }
  }

  function checkZoomSupport(track: MediaStreamTrack): void {
    zoomSupported.value = !!(track.getCapabilities() as TrackCapabilitiesExt).zoom;
  }

  function checkFlashSupport(track: MediaStreamTrack): void {
    flashSupported.value = !!(track.getCapabilities() as TrackCapabilitiesExt).torch;
  }

  async function applyZoom(level: number): Promise<void> {
    try {
      const track = (videoRef.value?.srcObject as MediaStream | null)?.getVideoTracks()[0];
      if (!track) return;
      const constraint: CameraAdvancedSettings = {
        advanced: [{ zoom: level }],
      };
      await track.applyConstraints(constraint);
      currentZoom.value = level;
    } catch {
      cameraError.value = t('imagePicker.camera.errors.zoom');
    }
  }

  async function toggleFlash(): Promise<void> {
    const track = (videoRef.value?.srcObject as MediaStream | null)
      ?.getVideoTracks()
      .find(t => t.readyState === 'live');
    if (!track) return;
    const caps = track.getCapabilities() as TrackCapabilitiesExt;
    if (!caps.torch) return;
    flashEnabled.value = !flashEnabled.value;
    const constraint: CameraAdvancedSettings = {
      advanced: [{ torch: flashEnabled.value }],
    };
    await track.applyConstraints(constraint);
  }

  function capturePhoto(): void {
    const video = videoRef.value;
    const canvas = canvasRef.value;
    if (!video || !canvas) return;

    if (!video.videoWidth || !video.videoHeight) {
      cameraError.value = t('imagePicker.camera.errors.noVideo');
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    previewSrc.value = canvas.toDataURL('image/webp', 0.9);

    canvas.toBlob(blob => {
      if (!blob) {
        cameraError.value = t('imagePicker.camera.errors.capture');
        return;
      }
      emit(
        'capture',
        new File([blob], `photo-${crypto.randomUUID()}.webp`, { type: 'image/webp' })
      );
      cameraError.value = '';
    }, 'image/webp');
  }

  function saveImage(): void {
    if (!previewSrc.value) {
      cameraError.value = t('imagePicker.camera.errors.noImage');
      return;
    }
    const link = document.createElement('a');
    link.href = previewSrc.value;
    link.download = `photo-${Date.now()}.webp`;
    link.click();
  }

  async function closeCamera(): Promise<void> {
    await stopStream();
    emit('close');
  }

  onMounted(initCameras);
  onBeforeUnmount(stopStream);
</script>
