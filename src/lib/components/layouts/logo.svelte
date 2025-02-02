<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
  import { siteConfig } from "$lib/config/site";
  import { goto } from "$app/navigation";
</script>

<button class="flex items-center cursor-pointer" onclick={() => goto('/')}>
  <Avatar.Root class="bg-neutral-800 mr-2">
    <Avatar.Image src={siteConfig.logo} alt="Logo" />
    <Avatar.Fallback>{siteConfig.initial}</Avatar.Fallback>
  </Avatar.Root>
  <div class="hidden md:block">
    {siteConfig.name}
  </div>
</button>
