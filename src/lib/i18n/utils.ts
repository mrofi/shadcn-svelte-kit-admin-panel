import { localeName } from "./config";

export const getNewLocaleQueryParam = (url: URL, locale: string) => {
  const newURL = new URL(url);
  newURL.searchParams.set(localeName, locale);
  return newURL;
}
