/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify';
// Styles
import '@mdi/font/css/materialdesignicons.css';

import 'vuetify/styles';
import { VBtn } from 'vuetify/components/VBtn';

const savedTheme = localStorage.getItem('rentaMedicTheme') || 'system';
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: savedTheme,
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1E3A8A',
          secondary: '#3B82F6',
          tertiary: '#10B981',
          background: '#F3F4F6',
          surface: '#FFFFFF',
        },
      },
      dark: {
        dark: true,
        colors: {},
      },
    },
  },
  aliases: {
    VBtnCustom: VBtn,
  },
  defaults: {
    VAppBar: {
      density: 'comfortable',
      elevation: 0,
      VAppBarTitle: {
        class: 'font-weight-black',
      },
    },
    VNavigationDrawer: {
      railWidth: 64,
      class: 'border-0',
    },
    VBtnCustom: {
      color: 'primary',
      size: 'large',
      rounded: 'lg',
      class: 'font-weight-bold',
    },
    VBtn: {
      rounded: 'lg',
    },
    VCard: {
      rounded: 'lg',
    },
    VAvatar: {
      variant: 'tonal',
    },
    VList: {
      density: 'comfortable',
      slim: true,
    },
    VTextField: {
      density: 'comfortable',
      variant: 'outlined',
      rounded: 'lg',
    },
  },
});
