<script lang="ts">
  export let transform = false;
  import { cn } from "@/utils";
</script>

<div
  class={cn(
    "w-[80%] transition-transform transform origin-center",
    transform && "rotate-45 translate-y-[9px] w-[100%]"
  )}
></div>

  <div
  class={cn(
    "w-[100%] transition-opacity",
    transform && "opacity-0"
  )}
></div>

  <div
  class={cn(
    "w-[50%] transition-transform transform origin-center",
    transform && "-rotate-45 -translate-y-[9px] w-[100%]"
  )}
></div>
