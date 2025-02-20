import { fallbackLocale } from "@/i18n/config";
import type { Translations } from "@sveltekit-i18n/base";
import { writable, type Writable } from "svelte/store";
import type { InputConstraints } from "sveltekit-superforms";

export const createSchema = (
  errorMessages: Translations.SerializedTranslations,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schemaFunc: (message: {[key: string]: string}, locale: unknown, ...args: any[]) => any,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (locale: string, ...args: any[]) => {
    const message = errorMessages[locale] ?? errorMessages[fallbackLocale]
    return schemaFunc(message, locale ?? fallbackLocale, ...args);
  }
}

export const formIsValid = (
  formData: { [key: string]: unknown },
  errors: { [key: string]: unknown },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constraints: InputConstraints<any>
): boolean => {
  const noError = Object.keys(errors).length === 0 || (
    Object.keys(errors).length > 0 &&
    Object.values(errors).every(value => value === undefined)
  );

  const hasRequiredFieldError = Object.entries(formData).some(([key, value]) => {
    const c = constraints[key] as Partial<{
      required: boolean;
    }>
    return value === '' && c.required === true;
  });

  return noError && !hasRequiredFieldError;
};


export type FormResultType = {
  success: boolean;
  message: string;
}

export type CreateFormResultType = {
  formResult: Writable<FormResultType>,
  showSuccess: (message: string) => void,
  showError: (message: string) => void,
}

export const createFormResult = (): CreateFormResultType => {
  const formResult = writable<FormResultType>({
    success: true,
    message: '',
  });

  const showSuccess = (message: string) => {
    formResult.set({ success: true, message });
  };

  const showError = (message: string) => {
    formResult.set({ success: false, message });
  };

  return {
    formResult,
    showSuccess,
    showError,
  }
}

