import { addTranslations, loadTranslations, setLocale, setRoute } from "@/i18n";

export const load = async ({ data }) => {
  const { i18n } = data;
  const { locale, route } = i18n;

  loadTranslations(locale, route);

  await setRoute(route);
  await setLocale(locale);

  const menuTranslation = await import(`./translation.json`);
  addTranslations(menuTranslation.default);

  return { i18n };
};