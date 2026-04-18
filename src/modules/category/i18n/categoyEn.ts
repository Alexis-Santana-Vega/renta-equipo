import type { CategoryI18nSchema } from './categoyEs';

export const categoryEn: CategoryI18nSchema = {
  category: {
    page: {
      title: 'Equipment Categories',
      subtitle: 'Manage categories and their technical features for the medical inventory.',
    },
    search: 'Search category...',
    headers: {
      name: 'Name',
      description: 'Description',
    },
    actions: {
      add: 'New Category',
      edit: 'Edit Category',
      delete: 'Delete Category',
    },
    dialog: {
      titleNew: 'New Category',
      titleEdit: 'Edit Category',
      deleteTitle: 'Delete category: {name}?',
      deleteMessage:
        'This action cannot be undone. All settings associated with this category will be removed.',
      errorMessage: 'An error occurred while deleting the category',
      successMessage: 'Category successfully removed',
    },
    form: {
      generalInfo: 'General Information',
      name: 'Category Name *',
      description: 'Brief description of the category *',
    },
    features: {
      title: 'Features',
      add: 'Add Feature',
      search: 'Search feature...',
      delete: 'Delete feature',
      edit: 'Edit feature',
      headers: {
        name: 'Feature Name',
        measure: 'Unit of Measure',
      },
      dialog: {
        titleNew: 'New Feature',
        titleEdit: 'Edit Feature',
        deleteTitle: 'Delete feature: {name}?',
        deleteMessage: 'Are you sure you want to remove this feature from the category?',
        errorMessage: 'An error occurred while deleting the feature',
        successMessage: 'Feature successfully deleted',
      },
      form: {
        name: 'Name (e.g. Weight, Voltage) *',
        measure: 'Related unit of measure',
      },
    },
  },
};
