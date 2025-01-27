<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
  import * as Select from "$lib/components/ui/select";
  import { siteConfig } from "$lib/config/site";
  import { Moon, Sun } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
	import { Separator } from "$lib/components/ui/separator";
  import { toggleMode } from "mode-watcher";
	import { locale, locales } from "@/i18n";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

  const updateLocale = (locale: string) => {
    let query = new URLSearchParams($page.url.searchParams.toString());
    query.set('locale', locale);
    goto(`?${query.toString()}`)
  }
</script>
<div
  class="container h-screen grid lg:max-w-none px-0"
>
  <div class="relative flex flex-col items-center justify-center">
    <div class="absolute right-2 top-4 md:right-4 flex flex-row-reverse items-center space-x-1">
      <Select.Root
        selected={{ label: $locale.toUpperCase(), value: $locale }}
        onSelectedChange={(v) => {
          if (v) {
            locale.set(v.value);
            updateLocale(v.value);
          }
        }}
      >
        <Select.Trigger
          class="border-0 shadow-none inline-flex w-[60px] focus:ring-0"
        >
          <Select.Value
            placeholder={$locale.toUpperCase()}
          />
        </Select.Trigger>
        <Select.Content>
          {#each $locales as l}
          <Select.Item value={l}>{l.toUpperCase()}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
      <Separator orientation="vertical" class="h-[30px]" />
      <Button on:click={toggleMode} variant="ghost" size="icon" class="hover:bg-transparent">
        <Sun
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </div>
    <div class="absolute left-4 top-4 md:left-8 h-9 flex items-center text-lg font-medium">
      <Avatar.Root class="bg-neutral-800 p-[3%] mr-2">
        <Avatar.Image src={siteConfig.logo} alt="Logo" />
        <Avatar.Fallback>{siteConfig.initial}</Avatar.Fallback>
      </Avatar.Root>
      {siteConfig.name}
    </div>
    <div class="py-24 lg:px-8">
      <div class="mx-auto flex w-[300px] flex-col justify-center space-y-6 sm:w-[350px]">
        <slot />
      </div>
    </div>
  </div>
</div>
