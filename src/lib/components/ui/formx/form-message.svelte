<script lang="ts">
	import { cn } from "@/utils";

  // Props
  let {
    children,
    class: className = '',
    Icon = null,
    iconClass = '',
  } = $props();
</script>

<div
  class={cn(
    'relative text-[0.7rem] pl-6 py-1 text-muted-foreground bg-muted',
    className
  )}
>
  {#if Icon}
    <!-- Pass className prop for lucide-svelte icons -->
    <Icon
      class={cn(
        'h-3 w-3 absolute inset-0 ml-1 mt-[0.38rem]',
        iconClass
      )}
    />
  {/if}
  <div>
    {@render children?.()}
  </div>
</div>
