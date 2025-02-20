<script lang="ts">
	import { cn } from "@/utils";

	let { children, class: className = '' } = $props();
</script>
<div
  class={cn(
    "py-6 md:py-12 min-h-full justify-center",
    className
  )}
>
  {@render children?.()}
</div>
