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

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'system',
  },
  aliases: {
    VBtnCustom: VBtn,
  },
  defaults: {
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
    VTextField: {
      density: 'comfortable',
      variant: 'outlined',
      rounded: 'lg',
    },
  },
});
