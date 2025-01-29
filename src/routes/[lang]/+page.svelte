<script>
  import { t } from "@/i18n";
	import BaseFront from "@/components/layouts/base.front.layout.svelte";
</script>

<BaseFront class="flex flex-col space-y-6 text-center">
  <h1 class="text-xl font-semibold">{$t('welcome', {default: 'Shadcn UI + SvelteKit'})}</h1>
  <p>{@html $t('visit_docs')}</p>
</BaseFront>
