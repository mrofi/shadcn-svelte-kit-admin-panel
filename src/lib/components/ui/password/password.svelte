<script lang="ts">
  import { Inputx, type Props as InputxProps } from "../inputx";
	import { cn } from "$lib/utils.js";

  type Props = InputxProps & {
    hideIcon?: any;
    showIcon?: any;
  };

  let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
    hideIcon = null,
    showIcon = null,
		...restProps
	}: Props = $props();
  
  let showPassword = $state(false);
  const togglePassword = () => {
    showPassword = !showPassword;
  };
</script>
<div class="relative">
  <Inputx
    type={showPassword ? "text" : "password"}
    class={cn("", className)}
    bind:value
    bind:ref
    {...restProps}
  />
  <button
    type="button"
    class="absolute right-2 top-1/2 -translate-y-1/2 transform text-xs"
    onclick={togglePassword}
  >
    {#if showPassword}
      {#if showIcon}
        {@render showIcon()}
      {:else}
        Hide
      {/if}
    {:else}
      {#if hideIcon}
        {@render hideIcon()}
      {:else}
        Show
      {/if}
    {/if}
  </button>

</div>