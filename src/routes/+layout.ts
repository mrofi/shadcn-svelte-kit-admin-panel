import { addTranslations, setLocale, setRoute } from "@/i18n";
import translation from "./translation.json";

export const load = async ({ data }) => {
  const { i18n } = data;
  const { locale, route } = i18n;

  addTranslations(translation);

  await setRoute(route);
  await setLocale(locale);

  return i18n;
};