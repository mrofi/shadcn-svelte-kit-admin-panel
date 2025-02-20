import { addTranslations } from "@/i18n";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ data }) => {
  const translation = await import(`./translation.json`);
  addTranslations(translation.default);

  return {
    ...data,
  }
};

