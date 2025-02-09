<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
  import { siteConfig } from "$lib/config/site";
  import { goto } from "$app/navigation";
  
  export let url = '/';
</script>

<button class="flex items-center cursor-pointer" onclick={() => goto(url)}>
  <Avatar.Root class="bg-neutral-800 mr-2 size-8">
    <Avatar.Image src={siteConfig.logo} alt="Logo" />
    <Avatar.Fallback>{siteConfig.initial}</Avatar.Fallback>
  </Avatar.Root>
  <div class="hidden md:block font-semibold">
    {siteConfig.name}
  </div>
</button>
