<script lang="ts">
	import { page } from "$app/state";
  import BaseFront from "@/components/layouts/front-base.svelte";
</script>

<BaseFront class="flex flex-col justify-center items-center w-full">
  <!-- Create error page -->
    <h1 class="text-2xl font-bold text-center">{page.status}</h1>
    <h1 class="text-xl font-normal text-center">{page.error?.message}</h1>
</BaseFront>
