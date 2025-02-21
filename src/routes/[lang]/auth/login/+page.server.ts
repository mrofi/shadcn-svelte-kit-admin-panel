import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./(form)/schema";
import { redirect } from "@sveltejs/kit";
import { siteConfig } from "@/config/site";
import { fail } from "sveltekit-superforms";

export const load: PageServerLoad = async ({ parent, url }) => {
  const { i18n } = await parent();
  const { locale } = i18n;
  const form = await superValidate(zod(formSchema(locale)));

  const nextUrl = url.searchParams.get("next");
  const redirectUrl = new URL(nextUrl ?? siteConfig.auth.loginRedirect ?? "/", url).toString();
  return { locale, form, redirectUrl };
};

export const actions: Actions = {
  login: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const { code } = error;
      if (code === 'invalid_credentials') {
        return fail(400, {errors: {login: 'failed'}});
      }

      throw error;
    } else {
      const next = url.searchParams.get('next') ?? siteConfig.auth.loginRedirect ?? "/";
      redirect(303, next);
    }
  },
}
