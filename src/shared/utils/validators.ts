/**
 * @file shared/utils/validators.ts
 *
 * Factory de validators internacionalizado.
 *
 * ─── POR QUÉ UN FACTORY Y NO LLAMAR useTypedLocale() DIRECTAMENTE ────
 * Los validators son funciones puras en shared/utils/: no son componentes
 * ni composables, por lo que no pueden llamar composables de Vue.
 * La solución es inyectar `t` como dependencia: el componente llama
 * `createValidators(t)` una vez y reutiliza el objeto resultante.
 *
 * ─── DÓNDE VIVE ESTE ARCHIVO ─────────────────────────────────────────
 * src/shared/utils/validators.ts
 *
 * ─── DÓNDE VIVEN SUS TRADUCCIONES ────────────────────────────────────
 * src/core/i18n/locales/es.ts  → sección `validation`
 * src/core/i18n/locales/en.ts  → sección `validation`
 * (No van en módulos porque los validators son transversales a toda la app)
 *
 * ─── USO EN UN COMPONENTE ────────────────────────────────────────────
 * <script setup lang="ts">
 * import { useTypedLocale } from '@/shared/composables/useTypedLocale'
 * import { createValidators } from '@/shared/utils/validators'
 *
 * const { t } = useTypedLocale()
 * const v = createValidators(t)
 *
 * const rules = {
 *   email:    [v.required(), v.maxLength(60, t('auth.login.email')), v.onlyEmail(t('auth.login.email'))],
 *   password: [v.required(), v.maxLength(24, t('auth.login.password')), v.onlyPassword(t('auth.login.password'))],
 *   role:     [v.required(), v.maxLength(10, t('auth.login.role'))],
 * }
 * </script>
 */

import type { I18nKeys } from '@/core/i18n/i18n-keys';

// ─── Tipos base ───────────────────────────────────────────────────────

type ValidationResult = true | string;
type Validator<T = unknown> = (v: T) => ValidationResult;

/**
 * Firma mínima de la función `t` que necesita el factory.
 * Compatible con lo que devuelve useTypedLocale().
 */
type TFunction = (key: I18nKeys, params?: Record<string, string | number>) => string;

// ─── Factory ──────────────────────────────────────────────────────────

/**
 * Crea el objeto de validators con todos los mensajes en el locale activo.
 *
 * Llámalo UNA vez por componente, dentro de <script setup>:
 *   const v = createValidators(t)
 *
 * Si el usuario cambia de idioma, Vue re-ejecutará el setup y los
 * mensajes se actualizarán automáticamente.
 */
export function createValidators(t: TFunction) {
  return {
    // ─── Generic / Primitive ─────────────────────────────────────────

    /**
     * Verifica que el valor sea truthy (string no vacío, número distinto de 0, etc.).
     * @param warning Mensaje personalizado (opcional). Por defecto usa la traducción.
     */
    required(warning?: string): Validator<unknown> {
      const msg = warning ?? t('validation.required');
      return v => (v !== null && v !== undefined && v !== '') || msg;
    },

    /**
     * Verifica que el arreglo/string tenga al menos un elemento.
     */
    requiredLength(warning?: string): Validator<{ length: number }> {
      const msg = warning ?? t('validation.requiredLength');
      return v => v.length > 0 || msg;
    },

    // ─── String length ───────────────────────────────────────────────

    minLength(length: number, field = 'Campo'): Validator<string> {
      const msg = t('validation.minLength', { field, min: length });
      return v => v.trim().length >= length || msg;
    },

    maxLength(length: number, field = 'Campo'): Validator<string> {
      const msg = t('validation.maxLength', { field, max: length });
      return v => v.trim().length <= length || msg;
    },

    // ─── Regex ───────────────────────────────────────────────────────

    /**
     * Validator genérico de regex. El mensaje de error es completamente libre,
     * por lo que el componente debe pasarlo ya traducido.
     *
     * Ejemplo:
     *   v.regexMatch(/^\d{5}$/, t('users.form.zipCodeError'))
     */
    regexMatch(regex: RegExp, errorMessage: string): Validator<string> {
      return v => regex.test(v) || errorMessage;
    },

    // ─── Format validators ───────────────────────────────────────────

    /**
     * Valida formato de correo electrónico.
     * Cubre: caracteres especiales permitidos antes del @, subdominios y TLD de 2+ letras.
     */
    onlyEmail(field = 'Email'): Validator<string> {
      const msg = t('validation.email', { field });
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return v => emailRegex.test(v.trim()) || msg;
    },

    /**
     * Contraseña: 8–15 caracteres, sin espacios, al menos:
     * un dígito, una minúscula, una mayúscula y un carácter especial (@#$%^&*!).
     */
    onlyPassword(field = 'Contraseña'): Validator<string> {
      const msg = t('validation.password', { field });
      const passRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*!])\S{8,15}$/;
      return v => passRegex.test(v) || msg;
    },

    /**
     * Solo letras (incluyendo acentos y ñ) y espacios.
     */
    onlyLetters(field = 'Campo'): Validator<string> {
      const msg = t('validation.onlyLetters', { field });
      return v => /^[a-zA-ZÀ-ÿñÑ\s]+$/.test(v.trim()) || msg;
    },

    /**
     * Solo dígitos; acepta opcionalmente espacios, guiones y paréntesis.
     */
    onlyNumbers(field = 'Campo'): Validator<string> {
      const msg = t('validation.onlyNumbers', { field });
      return v => /^[0-9\s()-]*$/.test(v.trim()) || msg;
    },

    /**
     * Formato de monto monetario: dígitos con comas como separador de miles
     * y hasta 2 decimales opcionales (ej: 1,234.56).
     */
    onlyAmount(field = 'Monto'): Validator<string> {
      const msg = t('validation.onlyAmount', { field });
      const amountRegex = /^[0-9]{1,3}(,[0-9]{3})*(\.[0-9]{1,2})?$|^[0-9]+(\.[0-9]{1,2})?$/;
      return v => amountRegex.test(v.trim()) || msg;
    },

    // ─── Numeric range ───────────────────────────────────────────────

    minNumber(number: number, field = 'Campo'): Validator<number> {
      const msg = t('validation.minNumber', { field, min: number });
      return v => v >= number || msg;
    },

    maxNumber(number: number, field = 'Campo'): Validator<number> {
      const msg = t('validation.maxNumber', { field, max: number });
      return v => v <= number || msg;
    },

    // ─── File validators ─────────────────────────────────────────────

    requiredFiles(warning?: string): Validator<File[]> {
      const msg = warning ?? t('validation.requiredFiles');
      return v => v.length > 0 || msg;
    },

    maxFiles(length = 1): Validator<File[]> {
      // singular/plural usando la clave common.file / common.files
      const label = length === 1 ? t('common.file') : t('common.files');
      const msg = t('validation.maxFiles', { max: length, label });
      return v => v.length <= length || msg;
    },

    /**
     * Valida que el tamaño total de los archivos no supere el límite (en bytes).
     * Por defecto: 1 MB.
     */
    maxSize(maxBytes = 1_048_576): Validator<File[]> {
      return v => {
        const totalBytes = v.reduce((sum, file) => sum + (file.size ?? 0), 0);
        if (totalBytes <= maxBytes) return true;
        const fmt = (b: number) => (b / 1_048_576).toFixed(2);
        return t('validation.maxSize', {
          current: fmt(totalBytes),
          max: fmt(maxBytes),
        });
      };
    },

    /**
     * Acepta un arreglo de MIME types permitidos.
     * @param allowed  Lista de MIME types: ['application/pdf', 'image/png']
     * @param label    Etiqueta legible (opcional). Si se omite, se genera desde los MIME types.
     *
     * Ejemplo:
     *   v.onlyMimeTypes(['application/pdf', 'image/png'])
     *   v.onlyMimeTypes(['application/pdf'], 'PDF')
     */
    onlyMimeTypes(allowed: string[], label?: string): Validator<File[]> {
      return v => {
        const invalid = v.filter(file => !allowed.includes(file.type));
        if (invalid.length === 0) return true;
        const names = invalid.map(f => f.name).join(', ');
        const types = label ?? allowed.map(mime => mime.split('/')[1].toUpperCase()).join(', ');
        return t('validation.invalidMimeTypes', { types, names });
      };
    },

    /** Atajo para solo PDF. */
    onlyPDF(): Validator<File[]> {
      return this.onlyMimeTypes(['application/pdf'], 'PDF');
    },
  };
}

/**
 * Tipo del objeto devuelto por createValidators().
 * Útil para tipar el objeto `v` si se pasa entre funciones.
 *
 * Ejemplo:
 *   function buildRules(v: ValidatorsInstance) { ... }
 */
export type ValidatorsInstance = ReturnType<typeof createValidators>;
