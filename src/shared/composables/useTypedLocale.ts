import type { I18nKeys } from '@/core/i18n/i18n-keys';
import { useI18n } from 'vue-i18n';

const VUETIFY_I18N_PREFIX = '$vuetify.' as const;

export function useTypedLocale() {
  const locale = useI18n();
  function tt(key: I18nKeys, params?: Record<string, unknown>) {
    const fullKey = key.startsWith(VUETIFY_I18N_PREFIX) ? key : `${VUETIFY_I18N_PREFIX}${key}`;
    return params !== undefined ? locale.t(fullKey, params) : locale.t(fullKey);
  }

  return { ...locale, t: tt };
}
