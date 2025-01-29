<script lang="ts">
	import { fallbackLocale, locale } from "@/i18n";

	let { components } = $props();

  let LocaleComponent = $state(components['./i18n/skeleton.svelte'].default);

  $effect(() => {
    if (components[`./i18n/${$locale}.svelte`]) {
      LocaleComponent = components[`./i18n/${$locale}.svelte`].default;
    } else if (components[`./i18n/${fallbackLocale}.svelte`]) {
      LocaleComponent = components[`./i18n/${fallbackLocale}.svelte`].default;
    }
  })
</script>

<LocaleComponent />
