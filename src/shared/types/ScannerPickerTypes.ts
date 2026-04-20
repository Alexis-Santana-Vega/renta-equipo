/** Lo que devuelve el servicio al resolver un código escaneado */
export interface ScannedEquipmentResponse {
  productId: string;
  name: string;
  photoUrl: string;
}

// ─── Form ─────────────────────────────────────────────────────────────

/** Estado del formulario de cantidad */
export interface EquipmentForm {
  productId: string;
  name: string;
  photoUrl: string;
  quantity: number;
}

// ─── Emit ─────────────────────────────────────────────────────────────

/** Payload que se emite al padre al confirmar el equipo */
export interface AddEquipmentPayload {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  codeValid: boolean;
}

// ─── Scanner ──────────────────────────────────────────────────────────

/** Formato de código de barras soportado */
export interface BarcodeFormats {
  code_128: boolean;
  code_39: boolean;
  code_93: boolean;
  codabar: boolean;
  data_matrix: boolean;
  ean_13: boolean;
  ean_8: boolean;
  itf: boolean;
  pdf417: boolean;
  qr_code: boolean;
  upc_a: boolean;
  upc_e: boolean;
}

/** Código detectado por vue-qrcode-reader */
export interface DetectedCode {
  rawValue: string;
  format: string;
  boundingBox: DOMRectReadOnly;
}

/** Capacidades de la cámara */
export interface CameraCapabilities extends MediaTrackCapabilities {
  torch?: boolean;
}

/** Opción de cámara disponible */
export interface CameraOption {
  label: string;
  constraints: MediaTrackConstraints | { facingMode: string };
}
