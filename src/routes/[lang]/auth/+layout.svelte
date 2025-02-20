<script lang="ts">
  let { children } = $props();
</script>

<div class="flex items-center justify-center w-full min-h-full">
  {@render children()}
</div>
