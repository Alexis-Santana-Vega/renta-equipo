// ─── Types ────────────────────────────────────────────────────────────────────

type ValidationResult = true | string;
type Validator<T = unknown> = (v: T) => ValidationResult;

// ─── Generic / Primitive ──────────────────────────────────────────────────────

/**
 * Verifica que el valor sea truthy (string no vacío, número distinto de 0, etc.).
 */
export const required =
  (warning = 'Campo requerido'): Validator<unknown> =>
  v =>
    (v !== null && v !== undefined && v !== '') || warning;

/**
 * Verifica que el arreglo/string tenga al menos un elemento.
 */
export const requiredLength =
  (warning = 'Campo requerido'): Validator<{ length: number }> =>
  v =>
    v.length > 0 || warning;

// ─── String length ────────────────────────────────────────────────────────────

export const minLength =
  (length: number, fieldName = 'Campo'): Validator<string> =>
  v =>
    v.trim().length >= length || `${fieldName} debe tener al menos ${length} caracteres`;

export const maxLength =
  (length: number, fieldName = 'Campo'): Validator<string> =>
  v =>
    v.trim().length <= length || `${fieldName} debe tener máximo ${length} caracteres`;

// ─── Regex ────────────────────────────────────────────────────────────────────

export const regexMatch =
  (regex: RegExp, errorMessage: string): Validator<string> =>
  v =>
    regex.test(v) || errorMessage;

// ─── Format validators ────────────────────────────────────────────────────────

/**
 * Valida formato de correo electrónico con una expresión más completa.
 * Cubre: caracteres especiales permitidos antes del @, subdominios, y TLD de 2+ letras.
 */
export const onlyEmail =
  (fieldName = 'Email'): Validator<string> =>
  v => {
    const trimmed = v.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(trimmed) || `${fieldName} debe ser: usuario@dominio.ext`;
  };

/**
 * Contraseña: 8–15 caracteres, sin espacios, al menos:
 * un dígito, una minúscula, una mayúscula y un carácter especial (@#$%^&*!).
 */
export const onlyPassword =
  (fieldName = 'Contraseña'): Validator<string> =>
  v => {
    const passRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*!])\S{8,15}$/;
    return (
      passRegex.test(v) ||
      `${fieldName} debe contener entre 8 y 15 caracteres, sin espacios, al menos un número, una minúscula, una mayúscula y un carácter especial (ej: @ # $ % & * !)`
    );
  };

/**
 * Solo letras (incluyendo acentos y ñ) y espacios.
 */
export const onlyLetters =
  (fieldName = 'Campo'): Validator<string> =>
  v =>
    /^[a-zA-ZÀ-ÿñÑ\s]+$/.test(v.trim()) || `${fieldName} solo debe contener letras y espacios`;

/**
 * Solo dígitos; acepta opcionalmente espacios, guiones y paréntesis (útil para teléfonos).
 */
export const onlyNumbers =
  (fieldName = 'Campo'): Validator<string> =>
  v =>
    /^[0-9\s()-]*$/.test(v.trim()) || `${fieldName} solo debe contener números`;

/**
 * Formato de monto monetario: dígitos con comas como separador de miles
 * y hasta 2 decimales opcionales (ej: 1,234.56).
 */
export const onlyAmount =
  (fieldName = 'Monto'): Validator<string> =>
  v => {
    const amountRegex = /^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]{1,2})?$|^[0-9]+(\.[0-9]{1,2})?$/;
    return amountRegex.test(v.trim()) || `${fieldName} inválido (ej: 1,234.56 o 1234.56)`;
  };

// ─── Numeric range ────────────────────────────────────────────────────────────

export const minNumber =
  (number: number, fieldName = 'Campo'): Validator<number> =>
  v =>
    v >= number || `${fieldName} debe ser mayor o igual a ${number}`;

export const maxNumber =
  (number: number, fieldName = 'Campo'): Validator<number> =>
  v =>
    v <= number || `${fieldName} debe ser menor o igual a ${number}`;

// ─── File validators ──────────────────────────────────────────────────────────

export const requiredFiles =
  (warning = 'Campo requerido'): Validator<File[]> =>
  v =>
    v.length > 0 || warning;

export const maxFiles =
  (length = 1): Validator<File[]> =>
  v =>
    v.length <= length || `Máximo ${length} ${length === 1 ? 'archivo' : 'archivos'}`;

/**
 * Valida que el tamaño total de los archivos no supere el límite (en bytes).
 * Por defecto: 1 MB.
 */
export const maxSize =
  (maxBytes = 1_048_576): Validator<File[]> =>
  v => {
    const totalBytes = v.reduce((sum, file) => sum + (file.size ?? 0), 0);
    if (totalBytes <= maxBytes) return true;
    const fmt = (b: number) => (b / 1_048_576).toFixed(2);
    return `El tamaño total (${fmt(totalBytes)} MB) supera el límite de ${fmt(maxBytes)} MB`;
  };

/**
 * Acepta un arreglo de MIME types permitidos.
 * Ejemplo: onlyMimeTypes(['application/pdf', 'image/png'])
 */
export const onlyMimeTypes =
  (allowed: string[], label?: string): Validator<File[]> =>
  v => {
    const invalid = v.filter(file => !allowed.includes(file.type));
    if (invalid.length === 0) return true;
    const names = invalid.map(f => f.name).join(', ');
    const types = label ?? allowed.map(t => t.split('/')[1].toUpperCase()).join(', ');
    return `Solo se permiten archivos ${types}. Inválidos: ${names}`;
  };

/** Atajo para solo PDF. */
export const onlyPDF = (): Validator<File[]> => onlyMimeTypes(['application/pdf'], 'PDF');
