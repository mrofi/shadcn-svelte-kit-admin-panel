import { loadLocaleFromQueryParam, localeName } from "@/i18n";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, request, cookies, locals }) => {
  const initLocale = cookies.get(localeName);
  const i18n = await loadLocaleFromQueryParam(url, request, initLocale);
  
  cookies.set(localeName, i18n.locale, {path: '/'});

  locals.i18n = i18n;

  return { i18n };
}
