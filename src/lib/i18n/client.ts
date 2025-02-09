import { goto } from '$app/navigation';
import { page } from '$app/state';
import { getNewLocaleQueryParam } from './utils';

const clientUpdateUrlAndHtmlLang = (url: string | URL, locale: string) => {
  // Navigate to new URL without losing history
  goto(url, { replaceState: true });

  // Update the `lang` attribute on the HTML tag
  document.documentElement.lang = locale;
}

export const clientUpdateLocaleQueryParam = (locale: string) => {
  const url = new URL(page.url); // Get current URL
  const newUrl = getNewLocaleQueryParam(url, locale);

  clientUpdateUrlAndHtmlLang(newUrl, locale); // Update URL and HTML lang attribute
}

const getNewLocaleUrl = (url: URL, locale: string, isClient: boolean) => {
  const pathSegments = url.pathname.split('/'); // Split path into segments

  // Replace first segment (language code) with new language
  pathSegments[1] = locale; 

  // Construct new URL with same query & hash
  return `${pathSegments.join('/')}${url.search}${isClient ? url.hash : ''}`;
}

export const clientUpdateLocaleUrl = (locale: string) => {
  const url = new URL(page.url); // Get current URL
  const newUrl = getNewLocaleUrl(url, locale, true);

  clientUpdateUrlAndHtmlLang(newUrl, locale); // Update URL and HTML lang attribute
}
