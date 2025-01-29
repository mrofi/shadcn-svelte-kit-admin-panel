import { addTranslations, setLocale, setRoute } from "@/i18n";

export const load = async ({ data }) => {
  const { i18n } = data;
  const { locale, route } = i18n;

  const translation = await import(`./translation.json`);
  addTranslations(translation.default);

  await setRoute(route);
  await setLocale(locale);

  return i18n;
};