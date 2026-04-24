import type { GlobalI18nSchema } from './locales/globalEs';
import type { AuthI18nSchema } from '@/modules/auth/i18n';
import type { VuetifyI18nSchema } from './vuetify-locale.types';
import type { CategoryI18nSchema } from '@/modules/category/i18n';
import type { UserI18nSchema } from '@/modules/user/i18n';
import type { EquipmentI18nSchema } from '@/modules/equipment/i18n';
import type { SupplierI18nSchema } from '@/modules/supplier/i18n';
import type { InboundI18nSchema } from '@/modules/inbound/i18n';
export type MessagesSchema = VuetifyI18nSchema &
  GlobalI18nSchema &
  AuthI18nSchema &
  CategoryI18nSchema &
  UserI18nSchema &
  EquipmentI18nSchema &
  SupplierI18nSchema &
  InboundI18nSchema;
// Agregar más módulos
