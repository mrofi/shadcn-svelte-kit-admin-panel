export async function handle({ event, resolve }) {
	return resolve(event, {
    // then you can read this local here bc SvelteKit will run this function after the +page.server.ts
		transformPageChunk: ({ html }) => {
			return html.replace(/<html([^>]*)>/, `<html lang="${event.locals.i18n.locale}">`)
		}
	});
};
