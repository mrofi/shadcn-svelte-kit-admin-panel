import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async ({ parent }) => {
  const { i18n } = await parent();

  return { i18n };
};
