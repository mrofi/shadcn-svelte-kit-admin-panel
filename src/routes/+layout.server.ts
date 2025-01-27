import { fallbackLocale, loadLocaleFromQueryParam } from "@/i18n";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, request, cookies }) => {
  const i18n = await loadLocaleFromQueryParam(url, request, cookies.get('locale') || fallbackLocale); 
  cookies.set('locale', i18n.locale, {path: '/'});

  return { i18n };
}
