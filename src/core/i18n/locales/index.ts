import { globalEs } from './globalEs';
import { globalEn } from './globalEn';

export type { GlobalI18nSchema } from './globalEs';

export const globalI18nSchema = {
  es: globalEs,
  en: globalEn,
} as const;
