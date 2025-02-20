<script lang="ts">
	import { CheckCircle, CircleX } from "lucide-svelte";
	import { FormMessage, type FormResultType } from ".";
	import type { Writable } from "svelte/store";

  let { formResult }: {formResult: Writable<FormResultType>} = $props();
  let success = $state(false);
  let message = $state('');
  $effect(() => {
    formResult.subscribe((value) => {
      success = value.success;
      message = value.message;
    });
  });
</script>

{#if message !== ''}
  {#if success}
    <FormMessage Icon={CheckCircle} iconClass="text-success">
      {message}
    </FormMessage>
  {:else}
    <FormMessage Icon={CircleX} iconClass="text-error">
      {message}
    </FormMessage>
  {/if}
{/if}
