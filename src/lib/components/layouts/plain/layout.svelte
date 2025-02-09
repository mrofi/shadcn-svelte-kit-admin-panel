<script lang="ts">

  let { navLeft = null, navMiddle = null, navRight = null, children } = $props();

</script>
<div class="flex flex-col min-h-screen">
  <div class="flex items-center justify-between py-2 px-4">
    <div class="flex items-center">
      {@render navLeft?.()}
    </div>
    <div class="flex items-center">
      {@render navMiddle?.()}
    </div>
    <div class="flex items-center">
      {@render navRight?.()}
    </div>
  </div>
  <div
    class="flex flex-1 container mx-auto md:max-w-md lg:max-w-lg xl:max-w-xl"
    >
    {@render children?.()}
  </div>
</div>
