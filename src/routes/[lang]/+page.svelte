<script lang="ts">
  import { t } from "@/i18n";
  import BaseFront from "@/components/layouts/front-base.svelte";
</script>

<BaseFront class="flex flex-col space-y-6 text-center">
  <h1 class="text-xl font-semibold">{$t('welcome', {default: 'Shadcn UI + SvelteKit'})}</h1>
  <p>
    <a href="/about" class="underline">{$t('about_this_project')}</a>
  </p>
  <p>{@html $t('visit_docs', {default: `<a href="https://shadcn-svelte.com" class="underline">shadcn-svelte.com</a>`})}</p>
</BaseFront>
