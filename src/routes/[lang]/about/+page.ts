import { setLocale, setRoute } from "@/i18n";

// Globally import the components based on the locale
const localeComponents: Record<string, { default: typeof import('./i18n/en.svelte')['default'] }> = import.meta.glob('./i18n/*.svelte', { eager: true });

export const load = async ({ parent }) => {
  const { i18n } = await parent();
  const { locale, route } = i18n;

  await setRoute(route);
  await setLocale(locale);

  return { ...i18n, localeComponents };
};