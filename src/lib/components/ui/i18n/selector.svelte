<script lang="ts">
	import { clientUpdateLocaleUrl, locale, locales } from "@/i18n";
	import * as Select from "$lib/components/ui/select";
</script>

<Select.Root
  type="single"
  value={$locale}
  onValueChange={(v) => {
    if (v) {
      clientUpdateLocaleUrl(v);
    }
  }}
>
  <Select.Trigger
    class="border-0 shadow-none inline-flex w-[60px] focus:ring-0 focus:ring-offset-0"
    aria-label="Select a language"
  >
    {$locale.toUpperCase()}
  </Select.Trigger>
  <Select.Content
    class="w-[60px]"
  >
    {#each $locales as l}
    <Select.Item 
      class="w-[60px]"
      value={l}
    >
      {l.toUpperCase()}
    </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
