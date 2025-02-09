<script lang="ts">
	import { page } from "$app/state";
  import BaseFront from "@/components/layouts/front-base.svelte";
</script>

<BaseFront>
  <!-- Create error page -->
   <div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-2xl font-bold text-center">{page.status}</h1>
    <h1 class="text-xl font-normal text-center">{page.error?.message}</h1>
   </div>
</BaseFront>
