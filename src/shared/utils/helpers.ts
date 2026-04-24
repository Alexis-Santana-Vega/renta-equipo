/**
 * Bloquea cualquier entrada de teclado que no sea un número entero.
 * Útil para @keydown o @keypress
 */
export const onlyIntegerNumbers = (event: KeyboardEvent): void => {
  const key = event.key;

  // Permitir teclas de control de navegación y edición
  const controlKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];

  if (controlKeys.includes(key)) {
    return;
  }

  // Bloquear si no es un dígito del 0 al 9
  if (!/^\d$/.test(key)) {
    event.preventDefault();
  }
};

/**
 * Valida la entrada de números decimales.
 * Permite solo números, un punto decimal y teclas de control.
 */
export const validateNumberInput = (event: KeyboardEvent, currentValue: string): void => {
  const key = event.key;
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];

  // 1. Permitir teclas de navegación/edición
  if (allowedKeys.includes(key)) {
    return;
  }

  // 2. Validar si la tecla es un número o un punto
  const isNumber = /\d/.test(key);
  const isDot = key === '.';

  if (!isNumber && !isDot) {
    event.preventDefault();
    return;
  }

  // 3. Regla de oro: No más de un punto decimal
  if (isDot && currentValue.includes('.')) {
    event.preventDefault();
  }
};

/**
 * Agrega comas como separadores de miles a un número o string numérico.
 */
export const addCommasToNumber = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === '') return '';

  // Asegurar que trabajamos con un string
  const stringValue = String(value);

  // Separar parte entera y decimal
  const [integerPart, decimalPart] = stringValue.split('.');

  // Agregar comas cada 3 dígitos en la parte entera
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export const formatNumberLocale = (value: number | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '';

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20, // Ajusta según la precisión que necesites
  }).format(num);
};

export const formatCurrencyValue = (value: string): string => {
  // 1. Eliminar todo lo que no sea número o punto
  let cleanValue = value.replace(/[^0-9.]/g, '');

  // 2. Evitar múltiples puntos decimales (solo dejar el primero)
  const parts = cleanValue.split('.');
  if (parts.length > 2) {
    cleanValue = `${parts[0]}.${parts.slice(1).join('')}`;
  }

  // 3. Limitar a dos decimales
  if (parts[1] && parts[1].length > 2) {
    cleanValue = `${parts[0]}.${parts[1].substring(0, 2)}`;
  }

  // 4. Retornar con comas usando tu función anterior
  return addCommasToNumber(cleanValue);
};
