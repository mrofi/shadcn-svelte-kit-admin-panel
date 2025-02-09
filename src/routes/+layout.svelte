<script lang="ts">
  import '../app.css';
  import PlainLayout from '@/components/layouts/plain/layout.svelte';
	import MobileMenu  from '$lib/components/layouts/menus/mobile.svelte';
	import Logo from '@/components/layouts/logo.svelte';
  import menu from './menu.json';
  import { ModeWatcher } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '@/utils';
	import { page } from '$app/state';
	import { siteConfig } from '@/config/site';
	import { Separator } from '@/components/ui/separator';
  import { Selector as DarkModeSelector } from "$lib/components/ui/darkmode";
  import { Selector as I18nSelector } from "$lib/components/ui/i18n";
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { locale, t } from '@/i18n';

  let { data, children } = $props();
  let { session, supabase } = $derived(data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    })

    return () => data.subscription.unsubscribe();
  })
</script>

{#snippet menuItem(url: string, title: string)}
  <a href={url} class={cn(
    page.url.pathname === `/${$locale}${url}`
      ? "font-semibold tracking-wide underline underline-offset-8"
      : "hover:font-semibold hover:tracking-wide"
  )}>{title}</a>
{/snippet}

{#snippet navMenu(menu: {name: string, path: string}[])}
  {#each menu as item (item.name)}
    {@render menuItem(item.path, $t(`menu.${item.name}`, {default: item.name}))}
  {/each}
{/snippet}

{#snippet mobileMenu()}
  <MobileMenu class="mr-4" title={siteConfig.name} >
    {@render navMenu(menu)}
    <DarkModeSelector class="-ml-3"/>
  </MobileMenu>
{/snippet}

<ModeWatcher />
<PlainLayout>
  {#snippet navLeft()}
    {@render mobileMenu()}
    <Logo />
  {/snippet}

  {#snippet navMiddle()}
    <!-- Navigation Links (Hidden on smaller screens) -->
    <nav class="hidden ml-4 md:flex space-x-4 text-sm font-normal tracking-wider flex-wrap">
      {@render navMenu(menu)}
    </nav>
  {/snippet}

  {#snippet navRight()}
    <DarkModeSelector class="hidden md:flex" />
    <Separator orientation="vertical" class="hidden md:flex h-[30px]" />
    <I18nSelector />
    <Button href="/app" class="text-xs h-8">{$t('try_button')}</Button>
  {/snippet}

  <!-- svelte-ignore  -->
  {@render children?.()}
</PlainLayout>
