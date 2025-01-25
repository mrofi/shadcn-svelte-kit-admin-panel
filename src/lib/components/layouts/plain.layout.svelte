<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
  import { siteConfig } from "$lib/config/site";
  import { Moon, Sun } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { toggleMode } from "mode-watcher";

</script>
<div
  class="container h-screen grid lg:max-w-none px-0"
>
  <div class="relative flex flex-col items-center justify-center">
    <div class="absolute right-2 top-4 md:right-4 flex flex-row-reverse items-center space-x-1">
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
      <Avatar.Root class="bg-neutral-800 p-[5%] mr-2">
        <Avatar.Image src={siteConfig.Logo} alt="Logo" />
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
