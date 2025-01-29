// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			i18n: import('$lib/i18n').Locale,
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
