<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
  import * as Select from "$lib/components/ui/select";
  import { siteConfig } from "$lib/config/site";
  import { Moon, Sun } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
	import { Separator } from "$lib/components/ui/separator";
  import { toggleMode } from "mode-watcher";
	import { clientUpdateLocaleUrl, locale, locales } from "@/i18n";
	import { goto } from "$app/navigation";

	let { navLeft = null, navRight = null, children } = $props();

  export const updateLocale = (locale: string) => {
    clientUpdateLocaleUrl(locale);
  }

</script>
<div
  class="container h-screen grid lg:max-w-none px-0"
  >
  <div class="relative flex flex-col items-center justify-center">
    <div class="absolute left-4 top-4 md:left-8 h-9 flex items-center space-x-6 text-lg font-medium">
      <button class="flex items-center cursor-pointer" onclick={() => goto('/')}>
        <Avatar.Root class="bg-neutral-800 mr-2">
          <Avatar.Image src={siteConfig.logo} alt="Logo" />
          <Avatar.Fallback>{siteConfig.initial}</Avatar.Fallback>
        </Avatar.Root>
        <div class="hidden md:block">
          {siteConfig.name}
        </div>
      </button>

      {@render navLeft?.()}
    </div>
    <div class="absolute right-2 top-4 md:right-4 flex flex-row items-center space-x-1">
      {@render navRight?.()}

      <Button onclick={toggleMode} variant="ghost" size="icon" class="hover:bg-transparent">
        <Sun
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
      <Separator orientation="vertical" class="h-[30px]" />
      <Select.Root
        type="single"
        value={$locale}
        onValueChange={(v) => {
          if (v) {
            locale.set(v);
            updateLocale(v);
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
    </div>
    {@render children?.()}
  </div>
</div>
