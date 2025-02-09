import i18n from 'sveltekit-i18n';
import { config } from './config';

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
