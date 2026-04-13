export const globalEs = {
  common: {
    save: 'Guardar',
    saving: 'Guardando...',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    create: 'Crear',
    search: 'Buscar',
    loading: 'Cargando...',
    noData: 'Sin datos para mostrar',
    error: 'Error',
    success: 'Operación exitosa',
    confirm: 'Confirmar',
    yes: 'Sí',
    no: 'No',
    actions: 'Acciones',
    back: 'Volver',
    next: 'Siguiente',
    previous: 'Anterior',
    close: 'Cerrar',
    selected: '{count} seleccionado(s)',
    file: 'archivo',
    files: 'archivos',
  },

  // ─── Mensajes de validación ─────────────────────────────────────────
  // Estos reemplazan los strings hardcodeados en validators.ts.
  // El factory createValidators(t) los usa internamente.
  validation: {
    required: 'Campo requerido',
    requiredLength: 'Campo requerido',

    minLength: '{field} debe tener al menos {min} caracteres',
    maxLength: '{field} debe tener máximo {max} caracteres',

    email: '{field} no tiene un formato válido',

    password:
      '{field} debe contener entre 8 y 15 caracteres, sin espacios, ' +
      'al menos un número, una minúscula, una mayúscula y un carácter especial (ej: # $ % & * !)',

    onlyLetters: '{field} solo debe contener letras y espacios',
    onlyNumbers: '{field} solo debe contener números',
    onlyAmount: '{field} inválido (ej: 1,234.56 o 1234.56)',

    minNumber: '{field} debe ser mayor o igual a {min}',
    maxNumber: '{field} debe ser menor o igual a {max}',

    requiredFiles: 'Campo requerido',
    // {max} y {label} → "Máximo 3 archivos"
    maxFiles: 'Máximo {max} {label}',
    // {current} y {max} en MB → "El tamaño total (2.50 MB) supera el límite de 1.00 MB"
    maxSize: 'El tamaño total ({current} MB) supera el límite de {max} MB',
    // {types} → "PDF, PNG"  |  {names} → "foto.gif, doc.xlsx"
    invalidMimeTypes: 'Solo se permiten archivos {types}. Inválidos: {names}',
  },

  errors: {
    generic: 'Ocurrió un error inesperado',
    notFound: 'No se encontró el recurso',
    forbidden: 'No tienes permiso para esta acción',
    unauthorized: 'Tu sesión expiró',
    network: 'Error de conexión',
  },

  nav: {
    home: 'Inicio',
    settings: 'Configuración',
    profile: 'Mi perfil',
  },

  layout: {
    title: 'RentaMedic',
    subtitle: 'Tu equipo médico, en un solo clic',
  },
};

export type GlobalI18nSchema = typeof globalEs;
