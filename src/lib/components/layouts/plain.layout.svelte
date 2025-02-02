<script lang="ts">
  import { Separator } from "$lib/components/ui/separator";
  import { Selector as DarkModeSelector } from "$lib/components/ui/darkmode";
  import { Selector as I18nSelector } from "$lib/components/ui/i18n";
  import Logo from "./logo.svelte";

  let { navLeft = null, navRight = null, children } = $props();

</script>
<div
  class="container h-screen grid lg:max-w-none px-0"
  >
  <div class="relative flex flex-col items-center justify-center">
    <div class="absolute left-4 top-4 md:left-8 h-9 flex items-center space-x-6 text-lg font-medium">
      <Logo />
      {@render navLeft?.()}
    </div>
    <div class="absolute right-2 top-4 md:right-4 flex flex-row items-center space-x-1">
      {@render navRight?.()}
      <DarkModeSelector />
      <Separator orientation="vertical" class="h-[30px]" />
      <I18nSelector />
    </div>
    {@render children?.()}
  </div>
</div>
