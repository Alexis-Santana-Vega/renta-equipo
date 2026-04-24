import type { GlobalI18nSchema } from './globalEs';

export const globalEn: GlobalI18nSchema = {
  common: {
    create: 'Create',
    search: 'Search',
    loading: 'Loading...',
    noData: 'No data to display',
    error: 'Error',
    success: 'Operation successful',
    confirm: 'Confirm',
    yes: 'Yes',
    no: 'No',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    selected: '{count} selected',
    file: 'file',
    files: 'files',
    //
    actions: 'Actions',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    requiredFields: '* Marked fields are required',
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
    equipment: 'Equipments',
    category: 'Categories',
    supplier: 'Suppliers',
    inbound: 'Inbounds',
    outbound: 'Outbounds',
    user: 'Users',
    logout: 'Logout',
  },

  layout: {
    title: 'RentaMedic',
    subtitle: 'Your medical equipment, in just one click',
  },

  language: {
    label: 'Language',
    es: 'Spanish',
    en: 'English',
  },

  roles: {
    label: 'Role',
    SYSADMIN: 'Sysadmin',
    ADMIN: 'Admin',
    CLIENT: 'Client',
  },

  colorTheme: {
    label: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },

  whatsapp: {
    label: 'Contact us on WhatsApp',
    prefilledMessage:
      'Good day! \n\nI am interested in renting medical equipment through your platform. **Could you share more information about your services and the types of equipment available?**',
  },

  search: {
    inputLabel: 'Search equipment',
    filterBy: 'You can filter by:',
    categoriesTitle: 'Categories',

    categories: {
      all: 'All',
      neonatal: 'Neonatal',
      respiratorio: 'Respiratory',
      laboratorio: 'Laboratory',
      ortopedico: 'Orthopedic',
      terapeutico: 'Therapeutic',
      odontologia: 'Dentistry',
      ginecologia: 'Gynecology',
    },
  },

  scanner: {
    cameraLabel: 'Camera {index}',
    dialog: {
      title: 'Information',
      quantity: 'Quantity *',
      cancel: 'Cancel',
      add: 'Add',
    },
    errors: {
      notAllowed: 'Please allow access to the camera.',
      notFound: 'No camera found on your device.',
      notSupported: 'This feature requires a secure connection (use HTTPS).',
      notReadable: 'Cannot use the camera. Is it in use by another app?',
      overconstrained: 'Your camera is not compatible.',
      streamApi: 'Your browser does not allow camera access.',
      generic: 'An error occurred while trying to access the camera.',
      codeNotFound: 'Code not recognized',
    },
  },

  imagePicker: {
    camera: {
      label: 'Camera {index}',
      flash: 'Flash',
      capture: 'Take photo',
      save: 'Save image',
      close: 'Close camera',
      errors: {
        notSupported: 'Your browser does not support camera access.',
        noDevices: 'No cameras found on your device.',
        fetchDevices: 'Error fetching cameras.',
        permissionDenied: 'Camera permission denied.',
        startStream: 'Error starting the camera.',
        capture: 'Error capturing the image.',
        noVideo: 'No active video to capture.',
        noImage: 'No image to save.',
        zoom: 'Error applying zoom.',
      },
    },
  },
};
