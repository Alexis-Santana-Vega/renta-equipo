export const categoryEs = {
  category: {
    page: {
      title: 'Categorías de Equipos',
      subtitle: 'Gestione las categorías y sus características técnicas para el inventario médico.',
    },
    search: 'Buscar categoría...',
    headers: {
      name: 'Nombre',
      description: 'Descripción',
    },
    actions: {
      add: 'Nueva Categoría',
      edit: 'Editar Categoría',
      delete: 'Eliminar Categoría',
    },
    dialog: {
      titleNew: 'Nueva Categoría',
      titleEdit: 'Editar Categoría',
      deleteTitle: '¿Eliminar categoría: {name}?',
      deleteMessage:
        'Esta acción no se puede deshacer. Se eliminarán todas las configuraciones asociadas a esta categoría.',
      errorMessage: 'Ha ocurrido un error al eliminar la categoría',
      successMessage: 'Categoría eliminada con éxito',
    },
    form: {
      generalInfo: 'Información General',
      name: 'Nombre de la categoría *',
      description: 'Breve descripción de la categoría *',
    },
    features: {
      title: 'Características',
      add: 'Agregar Característica',
      search: 'Buscar característica...',
      delete: 'Eliminar característica',
      edit: 'Editar característica',
      headers: {
        name: 'Nombre de la característica',
        measure: 'Unidad de Medida',
      },
      dialog: {
        titleNew: 'Nueva Característica',
        titleEdit: 'Editar Característica',
        deleteTitle: '¿Eliminar característica: {name}?',
        deleteMessage: '¿Está seguro de que desea eliminar esta característica de la categoría?',
        errorMessage: 'Ha ocurrido un error al eliminar la característica',
        successMessage: 'Característica eliminada con éxito',
      },
      form: {
        name: 'Nombre (ej. Peso, Voltaje) *',
        measure: 'Unidad de medida relacionada',
      },
    },
  },
};
export type CategoryI18nSchema = typeof categoryEs;
