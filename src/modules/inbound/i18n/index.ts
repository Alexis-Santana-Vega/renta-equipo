import { inboundEn } from './inboundEn';
import { inboundEs } from './inboundEs';

export type { InboundI18nSchema } from './inboundEs';

export const inboundI18nSchema = {
  es: inboundEs,
  en: inboundEn,
};
