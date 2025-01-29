<script lang="ts">
	import { cn } from "@/utils";

	let { children, class: className = '' } = $props();
</script>
<div
  class={cn(
    "py-24 mx-auto max-w-[80%] md:max-w-md lg:max-w-lg xl:max-w-xl",
    className
  )}
>
  {@render children?.()}
</div>
