export const siteConfig = {
  name: "Shadcn UI + SvelteKit",
  initial: "S",
  author: "Mokhamad Rofiudin",
  logo: "/favicon.png",
  description: "A SvelteKit starter template with Shadcn UI components.",
  url: "https://shadcn-svelte-kit-admin-panel.vercel.app/",
  defaultLocale: "en",
  localeIdentifier: "lang",
  locales: {
    en: "English",
    id: "Indonesia",
  },
  auth: {
    loginRedirect: '/app',
  }
};

export type SiteConfig = typeof siteConfig;
