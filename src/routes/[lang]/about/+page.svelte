<script lang="ts">
	import { Locale } from '@/components/ui/i18n/index.js';

	let { data } = $props();
  const { localeComponents } = data;

</script>

<Locale components={localeComponents} />
