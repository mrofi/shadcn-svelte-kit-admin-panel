// Globally import the components based on the locale
const localeComponents: Record<string, { default: typeof import('./i18n/en.svelte')['default'] }> = import.meta.glob('./i18n/*.svelte', { eager: true });

export const load = async () => {
  return { localeComponents };
};
