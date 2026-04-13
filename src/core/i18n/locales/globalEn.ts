import type { GlobalI18nSchema } from './globalEs';

export const globalEn: GlobalI18nSchema = {
  common: {
    save: 'Save',
    saving: 'Saving...',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    search: 'Search',
    loading: 'Loading...',
    noData: 'No data to display',
    error: 'Error',
    success: 'Operation successful',
    confirm: 'Confirm',
    yes: 'Yes',
    no: 'No',
    actions: 'Actions',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    selected: '{count} selected',
    file: 'file',
    files: 'files',
  },

  validation: {
    required: 'Required field',
    requiredLength: 'Required field',

    minLength: '{field} must be at least {min} characters',
    maxLength: '{field} must be at most {max} characters',

    email: '{field} has an invalid format',

    password:
      '{field} must be between 8 and 15 characters, no spaces, ' +
      'with at least one number, one lowercase, one uppercase and one special character (e.g. # $ % & * !)',

    onlyLetters: '{field} must contain only letters and spaces',
    onlyNumbers: '{field} must contain only numbers',
    onlyAmount: 'Invalid {field} (e.g. 1,234.56 or 1234.56)',

    minNumber: '{field} must be greater than or equal to {min}',
    maxNumber: '{field} must be less than or equal to {max}',

    requiredFiles: 'Required field',
    maxFiles: 'Maximum {max} {label}',
    maxSize: 'Total size ({current} MB) exceeds the limit of {max} MB',
    invalidMimeTypes: 'Only {types} files are allowed. Invalid: {names}',
  },

  errors: {
    generic: 'An unexpected error occurred',
    notFound: 'Resource not found',
    forbidden: 'You do not have permission for this action',
    unauthorized: 'Your session has expired',
    network: 'Connection error',
  },

  nav: {
    home: 'Home',
    settings: 'Settings',
    profile: 'My profile',
  },

  layout: {
    title: 'RentaMedic',
    subtitle: 'Your medical equipment, in just one click',
  },
};
