import { globalI18nSchema } from '@/core/i18n/locales';
import { authI18nSchema } from '@/modules/auth/i18n';
import { categoryI18nSchema } from '@/modules/category/i18n';
import { equipmentI18nSchema } from '@/modules/equipment/i18n';
import { userI18nSchema } from '@/modules/user/i18n';
import { createI18n } from 'vue-i18n';
import { en, es } from 'vuetify/locale';

const messages = {
  es: {
    $vuetify: {
      ...es,
      ...globalI18nSchema.es,
      ...authI18nSchema.es,
      ...categoryI18nSchema.es,
      ...userI18nSchema.es,
      ...equipmentI18nSchema.es,
    },
  },
  en: {
    $vuetify: {
      ...en,
      ...globalI18nSchema.en,
      ...authI18nSchema.en,
      ...categoryI18nSchema.en,
      ...userI18nSchema.en,
      ...equipmentI18nSchema.en,
    },
  },
};

let savedLanguage: string | null = localStorage.getItem('rentaMedicLanguage');
if (savedLanguage === null) {
  localStorage.setItem('rentaMedicLanguage', 'es');
  savedLanguage = 'es';
}

export const i18n = createI18n({
  legacy: false,
  locale: savedLanguage,
  fallbackLocale: 'en',
  messages,
});
