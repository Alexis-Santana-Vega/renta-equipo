import type { GlobalI18nSchema } from './locales/globalEs';
import type { AuthI18nSchema } from '@/modules/auth/i18n';
import type { VuetifyI18nSchema } from './vuetify-locale.types';
import type { CategoryI18nSchema } from '@/modules/category/i18n';
export type MessagesSchema = VuetifyI18nSchema &
  GlobalI18nSchema &
  AuthI18nSchema &
  CategoryI18nSchema;
// Agregar más módulos
