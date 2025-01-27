import i18n from 'sveltekit-i18n';
import { siteConfig } from "./config/site";
import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';

export type Locale = {
  locale: string,
  route: string
}

export const fallbackLocale = siteConfig.defaultLocale;

export const config: import('sveltekit-i18n').Config = {
  fallbackLocale,
}

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));

export const updateLocale = (locale: string, currentUrl: string) => {
  const query = new URLSearchParams(currentUrl);
  query.set('locale', locale);
  goto(`?${query.toString()}`)
}

export const loadLocaleFromQueryParam = async (url: URL, request: Request, defaultLocale: string): Promise<Locale> => {
  const { pathname: route, searchParams } = url;
  const supportedLocales = Object.keys(siteConfig.locales);
  const paramLocale = searchParams.get('locale');
  let locale = defaultLocale;
  
  if ((!paramLocale && supportedLocales.findIndex((l) => l === paramLocale) < 0) && request.method.toUpperCase() === 'GET') {
    const newURL = new URL(url);
    newURL.searchParams.set('locale', locale);
    return redirect(302, newURL);
  }

  if (!defaultLocale || paramLocale !== defaultLocale) {
    locale = paramLocale || locale;
  }

  await loadTranslations(locale, route);

  return { locale, route };
}

export const loadLocaleFromUrl = async (url: URL, request: Request, defaultLocale: string): Promise<Locale> => {
  const { pathname } = url;
  const supportedLocales = Object.keys(siteConfig.locales);
  let locale = supportedLocales.find((l) => l === `${pathname.match(/[^/]+?(?=\/|$)/)}`.toLowerCase());

  if (!locale && request.method.toUpperCase() === 'GET') {
    locale = `${`${request.headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();
    if (!supportedLocales.includes(locale)) {
      locale = defaultLocale;
    }
    const newURL = new URL(url);
    newURL.pathname = `/${locale}${pathname}`;
    return redirect(302, newURL);
  }

  if (!locale) {
    locale = defaultLocale;
  }

  const route = pathname.replace(`^/${locale}`, '');
  await loadTranslations(locale, route);

  return { locale, route };
}
