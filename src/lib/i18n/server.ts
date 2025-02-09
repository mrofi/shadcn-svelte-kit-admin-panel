import type { Locale } from './types';
import { fallbackLocale, localeName, supportedLocales } from './config';
import { getNewLocaleQueryParam } from './utils';
import { redirect, type Cookies, type Handle } from '@sveltejs/kit';
import { loadTranslations } from '.';

const getLocaleFromHeader = (request: Request) => {
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

const getValidInitialLocale = (initLocale: string | undefined, request: Request) => {
  // If the initial locale is not supported, try to detect it from the header
  if (initLocale && supportedLocales.includes(initLocale)) {
    return initLocale;
  }
  return getLocaleFromHeader(request);
}

export const loadLocaleFromQueryParam = async (
  url: URL,
  request: Request,
  alternateLocale?: string
): Promise<Locale> => {
  const { pathname: route, searchParams } = url;
  const paramLocale = searchParams.get(localeName);

  // Determine initial locale (use alternateLocale or get locale from header or fallback to defaultLocale)
  let locale = getValidInitialLocale(alternateLocale, request);

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

export const loadLocaleFromUrl = async (
  url: URL, 
  request: Request, 
  alternateLocale?: string
): Promise<Locale> => {
  const { pathname } = url;

  // Extract the locale from the URL pathname
  let locale = supportedLocales.find((l) =>
    l === pathname.match(/[^/]+?(?=\/|$)/)?.[0]?.toLowerCase()
  );

  // Handle missing locale for GET requests
  if (!locale && request.method.toUpperCase() === 'GET') {
    locale = getValidInitialLocale(alternateLocale, request);

    // Redirect to the URL with the detected locale
    const newURL = `${locale}${pathname}${url.search}`;
    return redirect(302, newURL);
  }

  // Default to the default locale if none is found
  if (!locale) {
    locale = fallbackLocale;
  }

  // Determine the route by stripping the locale from the pathname
  const route = pathname.replace(new RegExp(`^/${locale}`), '');

  // Load translations for the detected locale and route
  await loadTranslations(locale, route);

  return { locale, route };
};

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.getI18n = async (url: URL, request: Request, cookies: Cookies) => {
    // get locale from cookie
    const initLocale = cookies.get(localeName);
    const i18n = await loadLocaleFromUrl(url, request, initLocale);
    event.locals.i18n = i18n;
    cookies.set(localeName, i18n.locale, {path: '/'});
  
    return i18n;
  }

  return resolve(event, {
    // then you can read this local here bc SvelteKit will run this function after the +page.server.ts
		transformPageChunk: ({ html }) => {
			return html.replace(/<html([^>]*)>/, `<html lang="${event.locals.i18n.locale}">`)
		}
	});
};