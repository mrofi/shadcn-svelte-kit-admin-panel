<script lang="ts">
  import * as Select from "$lib/components/ui/select";
	import { locale, locales } from "@/i18n";
	import { clientUpdateLocaleUrl } from "@/i18n/client";
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
    class="min-w-0"
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
