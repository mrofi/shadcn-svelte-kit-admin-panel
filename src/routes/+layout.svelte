<script lang="ts">
	import '../app.css';
	import PlainLayout from '$lib/components/layouts/plain.layout.svelte';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
</script>

<ModeWatcher />
<PlainLayout>
	<!-- svelte-ignore  -->
	{@render children()}
</PlainLayout>
