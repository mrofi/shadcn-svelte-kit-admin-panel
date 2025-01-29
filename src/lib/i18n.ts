import i18n from 'sveltekit-i18n';
import { siteConfig } from "./config/site";
import { goto } from '$app/navigation';
import { page } from '$app/state';
import { redirect } from '@sveltejs/kit';

export type Locale = {
  locale: string,
  route: string
}

export const genericLocales = siteConfig.locales;

export const fallbackLocale = siteConfig.defaultLocale;

export const localeName = siteConfig.localeIdentifier;

export const config: import('sveltekit-i18n').Config = {
  fallbackLocale,
}

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));

const getLocaleFromHeader = (supportedLocales: string[], request: Request, fallbackLocale: string) => {
   // Attempt to detect locale from the `Accept-Language` header
   const headerLocale = request.headers
    .get('accept-language')
    ?.match(/[a-zA-Z]+?(?=-|_|,|;)/)?.[0]
    ?.toLowerCase();
  
  if (headerLocale && supportedLocales.includes(headerLocale)) {
    return headerLocale;
  }

  return fallbackLocale;
}

const getValidInitialLocale = (initLocale: string | undefined, supportedLocales: string[], request: Request, fallbackLocale: string) => {
  // If the initial locale is not supported, try to detect it from the header
  if (initLocale && supportedLocales.includes(initLocale)) {
    return initLocale;
  }
  return getLocaleFromHeader(supportedLocales, request, fallbackLocale);
}

const clientUpdateUrlAndHtmlLang = (url: string | URL, locale: string) => {
  // Navigate to new URL without losing history
  goto(url, { replaceState: true });

  // Update the `lang` attribute on the HTML tag
  document.documentElement.lang = locale;
}

export const getNewLocaleQueryParam = (url: URL, locale: string) => {
  const newURL = new URL(url);
  newURL.searchParams.set(localeName, locale);
  return newURL;
}

export const loadLocaleFromQueryParam = async (
  url: URL,
  request: Request,
  alternateLocale?: string
): Promise<Locale> => {
  const { pathname: route, searchParams } = url;
  const supportedLocales = Object.keys(siteConfig.locales);
  const paramLocale = searchParams.get(localeName);
  const defaultLocale = siteConfig.defaultLocale;

  // Determine initial locale (use alternateLocale or get locale from header or fallback to defaultLocale)
  let locale = getValidInitialLocale(alternateLocale, supportedLocales, request, defaultLocale);

  // Redirect if `locale` query param is missing or invalid for GET requests
  if (
    (!paramLocale || !supportedLocales.includes(paramLocale)) &&
    request.method.toUpperCase() === 'GET'
  ) {
    const newURL = getNewLocaleQueryParam(url, locale);
    return redirect(302, newURL);
  }

  // Update locale based on query param if valid
  if (paramLocale && supportedLocales.includes(paramLocale)) {
    locale = paramLocale;
  }

  // Load translations for the detected locale and route
  await loadTranslations(locale, route);

  return { locale, route };
};

export const clientUpdateLocaleQueryParam = (locale: string) => {
  const url = new URL(page.url); // Get current URL
  const newUrl = getNewLocaleQueryParam(url, locale);

  clientUpdateUrlAndHtmlLang(newUrl, locale); // Update URL and HTML lang attribute
}

const getNewLocaleUrl = (url: URL, locale: string) => {
  const pathSegments = url.pathname.split('/'); // Split path into segments

  // Replace first segment (language code) with new language
  pathSegments[1] = locale; 

  // Construct new URL with same query & hash
  return `${pathSegments.join('/')}${url.search}${url.hash}`;
}

export const loadLocaleFromUrl = async (
  url: URL, 
  request: Request, 
  alternateLocale?: string
): Promise<Locale> => {
  const { pathname } = url;
  const supportedLocales = Object.keys(siteConfig.locales);
  const defaultLocale = siteConfig.defaultLocale;

  // Extract the locale from the URL pathname
  let locale = supportedLocales.find((l) =>
    l === pathname.match(/[^/]+?(?=\/|$)/)?.[0]?.toLowerCase()
  );

  // Handle missing locale for GET requests
  if (!locale && request.method.toUpperCase() === 'GET') {
    locale = getValidInitialLocale(alternateLocale, supportedLocales, request, defaultLocale);

    // Redirect to the URL with the detected locale
    const newURL = getNewLocaleUrl(url, locale);
    return redirect(302, newURL);
  }

  // Default to the default locale if none is found
  if (!locale) {
    locale = defaultLocale;
  }

  // Determine the route by stripping the locale from the pathname
  const route = pathname.replace(new RegExp(`^/${locale}`), '');

  // Load translations for the detected locale and route
  await loadTranslations(locale, route);

  return { locale, route };
};

export const clientUpdateLocaleUrl = (locale: string) => {
  const url = new URL(page.url); // Get current URL
  const newUrl = getNewLocaleUrl(url, locale);

  clientUpdateUrlAndHtmlLang(newUrl, locale); // Update URL and HTML lang attribute
}
