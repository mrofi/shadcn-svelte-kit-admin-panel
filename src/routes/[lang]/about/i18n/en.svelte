<script lang="ts">
  import BaseFront from "@/components/layouts/front-base.svelte";
  import { Button } from "$lib/components/ui/button";
  import { ExternalLink } from "lucide-svelte";
  import { Star } from "svelte-radix";
</script>

<BaseFront>
  <h1 class="text-xl font-semibold">
    About This Project <br>
    <small class="font-normal">An admin panel built with Svelte and shadcn-svelte</small>
  </h1>
  <p class="mt-6">
    Welcome to our dashboard project! We're building a powerful and flexible admin panel using Svelte and shadcn-svelte. This project is currently under active development, and we're excited to share our progress with you.
  </p>
  <h3 class="text-xl font-semibold mt-6">Key Features</h3>
  <ul class="list-disc list-inside pl-2">
    <li>Responsive design for all devices</li>
    <li>Dark mode support</li>
    <li>Customizable components with shadcn-svelte</li>
    <li>User authentication and role management</li>
    <li>and many more...</li>
  </ul>
  <h3 class="text-xl font-semibold mt-6">Development Progress</h3>
  <p>
    Our team is working hard to bring this dashboard to life. We're continuously adding new features, refining the user interface, and optimizing performance. Stay tuned for regular updates!
  </p>

  <div class="flex flex-wrap flex-row items-center space-y-2 justify-between mt-6">
    <Button variant="outline" href="https://www.threads.net/@m_rofi" target="_blank">
      <ExternalLink class="mr-2 h-4 w-4" />
      Follow Our Progress on Threads
    </Button>
    <Button variant="outline" href="https://github.com/roketid/shadcn-svelte-kit-admin-panel" target="_blank">
      <ExternalLink class="mr-2 h-4 w-4" />
      Star <Star class="h-4 w-4" /> on GitHub
    </Button>
  </div>
</BaseFront>
