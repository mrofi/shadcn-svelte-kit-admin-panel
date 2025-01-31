<script lang="ts">
  import BaseFront from "@/components/layouts/base.front.layout.svelte";
  import { Skeleton } from "@/components/ui/skeleton";
</script>

<BaseFront class="w-[300px] sm:w-[500px] lg:w-[550px] xl:w-[600px]">
  <div class="flex flex-col">
    <Skeleton class="w-2/3 h-8" />
    <Skeleton class="w-1/4 h-4 mt-2" />
  </div>
  <div class="mt-6 space-y-3">
    <Skeleton class="w-7/8 h-8" />
    <Skeleton class="w-7/8 h-8" />
    <Skeleton class="w-7/8 h-8" />
    <Skeleton class="w-7/8 h-8" />
    <Skeleton class="w-7/8 h-8" />
    <Skeleton class="w-7/8 h-8" />
    <Skeleton class="w-7/8 h-8" />
    <Skeleton class="w-7/8 h-8" />
  </div>
</BaseFront>
