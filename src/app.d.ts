import type { Session, SupabaseClient, User } from '@supabase/supabase-js'
import type { Cookies } from '@sveltejs/kit';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      i18n: import('$lib/i18n/types').Locale
      getI18n: (url: URL, request: Request, cookies: Cookies) => Promise<import('$lib/i18n/types').Locale>
      supabase: SupabaseClient
      safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
      session: Session | null
      user: User | null
    }
    interface PageData {
      session: Session | null
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
