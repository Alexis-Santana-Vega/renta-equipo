export const globalEs = {
  common: {
    create: 'Crear',
    search: 'Buscar',
    loading: 'Cargando...',
    noData: 'Sin datos para mostrar',
    error: 'Error',
    success: 'Operación exitosa',
    confirm: 'Confirmar',
    yes: 'Sí',
    no: 'No',
    back: 'Volver',
    next: 'Siguiente',
    previous: 'Anterior',
    close: 'Cerrar',
    selected: '{count} seleccionado(s)',
    file: 'archivo',
    files: 'archivos',
    //
    actions: 'Acciones',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    requiredFields: '* Los campos marcados son obligatorios',
  },

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

  language: {
    label: 'Idioma',
    es: 'Español',
    en: 'Inglés',
  },

  roles: {
    label: 'Rol',
    SYSADMIN: 'Sysadmin',
    ADMIN: 'Administrador',
    CLIENT: 'Cliente',
  },

  colorTheme: {
    label: 'Tema',
    light: 'Claro',
    dark: 'Oscuro',
    system: 'Sistema',
  },

  whatsapp: {
    label: 'Comunícate por WhatsApp',
    prefilledMessage:
      '¡Buen día! \n\nEstoy interesado en alquilar equipo médico a través de su plataforma. **¿Podrían proporcionarme más información sobre los servicios que ofrecen, los tipos de equipos disponibles?**',
  },

  search: {
    inputLabel: 'Buscar equipo',
    filterBy: 'Puedes filtrar por:',
    categoriesTitle: 'Categorías',

    categories: {
      all: 'Todos',
      neonatal: 'Neonatal',
      respiratorio: 'Respiratorio',
      laboratorio: 'Laboratorio',
      ortopedico: 'Ortopédico',
      terapeutico: 'Terapéutico',
      odontologia: 'Odontología',
      ginecologia: 'Ginecología',
    },
  },

  scanner: {
    cameraLabel: 'Cámara {index}',
    dialog: {
      title: 'Información',
      quantity: 'Cantidad *',
      cancel: 'Cancelar',
      add: 'Agregar',
    },
    errors: {
      notAllowed: 'Por favor, permite el acceso a la cámara.',
      notFound: 'No se encontró cámara en tu dispositivo.',
      notSupported: 'Esta función requiere una conexión segura (usa HTTPS).',
      notReadable: 'No se puede usar la cámara. ¿Está en uso por otra app?',
      overconstrained: 'Tu cámara no es compatible.',
      streamApi: 'Tu navegador no permite usar la cámara.',
      generic: 'Ocurrió un error al intentar acceder a la cámara.',
      codeNotFound: 'Código no reconocido',
    },
  },
};

export type GlobalI18nSchema = typeof globalEs;
