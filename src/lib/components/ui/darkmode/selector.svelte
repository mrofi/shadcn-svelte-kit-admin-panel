<script lang="ts">
  import { Moon, Sun } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { toggleMode } from "mode-watcher";
	import { cn } from "@/utils";

  let { class: className } = $props();
</script>

<Button onclick={toggleMode} variant="ghost" size="icon" class={cn("hover:bg-transparent focus:ring-transparent focus-visible:ring-transparent", className)}>
  <Sun
    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  />
  <Moon
    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  />
  <span class="sr-only">Toggle theme</span>
</Button>
