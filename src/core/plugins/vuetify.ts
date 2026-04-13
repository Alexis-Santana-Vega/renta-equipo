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
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';
import { i18n } from './i18n';
// import { productMessages } from '@/modules/products/i18n'
const customIcons = {
  cancel: 'mdi-close-circle-outline',
  clear: 'mdi-close-circle-outline',
};
let savedTheme: string | null = localStorage.getItem('rentaMedicTheme');
if (savedTheme === null) {
  localStorage.setItem('rentaMedicTheme', 'system');
  savedTheme = 'system';
}
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
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
          question: '#2196F3',
        },
      },
      dark: {
        dark: true,
        colors: {},
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...customIcons,
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
        class: 'font-weight-black text-medium-emphasis',
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
      variant: 'flat',
      VCardTitle: {
        class: 'font-weight-black text-medium-emphasis',
      },
      VCardSubtitle: {
        class: 'text-label-large',
      },
    },
    VAvatar: {
      variant: 'tonal',
    },
    VList: {
      density: 'comfortable',
      rounded: 'lg',
      variant: 'flat',
      color: 'primary',
      slim: true,
      VListItem: {
        rounded: 'lg',
      },
    },
    VDataTable: {
      mobile: null,
      mobileBreakpoint: 'sm',
    },
    VPagination: {
      density: 'comfortable',
    },
    VRow: {
      density: 'comfortable',
    },
    VTooltip: {
      openDelay: 300,
      closeDalay: 100,
      location: 'top',
      contentClass: 'bg-primary font-weight-medium',
    },
    VChip: {
      class: 'text-label-medium',
      rounded: 'lg',
    },
    VChipGroup: {},
    VTextField: {
      density: 'comfortable',
      variant: 'outlined',
      rounded: 'lg',
    },
  },
});
