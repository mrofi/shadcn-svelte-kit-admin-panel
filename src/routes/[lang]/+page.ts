import { addTranslations, setLocale, setRoute } from "@/i18n";

export const load = async ({ parent }) => {
  const { i18n } = await parent();
  const { locale, route } = i18n;

  const translation = await import(`./translation.json`);
  addTranslations(translation.default);

  await setRoute(route);
  await setLocale(locale);

  return i18n;
};