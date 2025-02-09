import { addTranslations } from "@/i18n";

export const load = async () => {
  const translation = await import(`./translation.json`);
  addTranslations(translation.default);
};