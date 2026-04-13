import type { MessagesSchema } from './types';

type Paths<T, P extends string = ''> = {
  [K in keyof T]: T[K] extends object ? Paths<T[K], `${P}${K & string}.`> : `${P}${K & string}`;
}[keyof T];

export type I18nKeys = Paths<MessagesSchema>;
