import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, request, cookies, locals }) => {
  // get session from supabase
  const { session } = await locals.safeGetSession();

  // get Locale from i18n
  const i18n = await locals.getI18n(url, request, cookies);

  return { session, cookies: cookies.getAll(), i18n };
}
