<script lang="ts">
	import { cn } from "@/utils";

	let { children, class: className = '' } = $props();
</script>
<div
  class={cn(
    "py-6 md:py-12",
    className
  )}
>
  {@render children?.()}
</div>
