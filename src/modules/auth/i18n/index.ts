import { authEn } from './authEn';
import { authEs } from './authEs';

export type { AuthI18nSchema } from './authEs';
export const authI18nSchema = {
  es: authEs,
  en: authEn,
};
