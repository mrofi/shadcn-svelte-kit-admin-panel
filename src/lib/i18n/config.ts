import { siteConfig } from '@/config/site';

export const genericLocales = siteConfig.locales;

export const supportedLocales = Object.keys(genericLocales);

export const fallbackLocale = siteConfig.defaultLocale;

export const localeName = siteConfig.localeIdentifier;

export const config: import('sveltekit-i18n').Config = {
  translations: {
    en: genericLocales,
    id: genericLocales,
  },
  fallbackLocale,
}
