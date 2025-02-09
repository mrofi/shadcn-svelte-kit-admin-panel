import { addTranslations, loadTranslations } from "@/i18n";
import { createBrowserClient, createServerClient, isBrowser } from "@supabase/ssr";
import { env } from '$env/dynamic/public'

export const load = async ({ data, depends, fetch }) => {
  /**
   * Declare a dependency so the layout can be invalidated, for example, on
   * session refresh.
   */
  depends('supabase:auth');

  const supabase = isBrowser()
    ? createBrowserClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
      })
    : createServerClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
        cookies: {
          getAll() {
            return data.cookies
          },
        },
      })

  /**
   * It's fine to use `getSession` here, because on the client, `getSession` is
   * safe, and on the server, it reads `session` from the `LayoutData`, which
   * safely checked the session using `safeGetSession`.
   */
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // load translations for the current locale
  const { i18n } = data;
  const { locale, route } = i18n;
  loadTranslations(locale, route);

  // load translations for the layout components
  const translation = await import(`./translation.json`);
  addTranslations(translation.default);

  return { supabase, session, user, i18n };
};