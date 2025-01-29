<script lang="ts">
  import '../app.css';
  import PlainLayout from '$lib/components/layouts/plain.layout.svelte';
  import { ModeWatcher } from 'mode-watcher';
  let { children } = $props();
</script>

{#snippet navMenu(active: string)}
  <a href="/docs" class="hover:text-gray-900">Documentation</a>
  <a href="/features" class="hover:text-gray-900">Features</a>
  <a href="/about" class="hover:text-gray-900">About</a>
{/snippet}

{#snippet navLeft()}
  <!-- Navigation Links (Hidden on smaller screens) -->
  <nav class="hidden md:flex space-x-6 text-gray-600">
    {@render navMenu("")}
  </nav>
{/snippet}

<ModeWatcher />
<PlainLayout>
  <!-- svelte-ignore  -->
  {@render children()}
</PlainLayout>
