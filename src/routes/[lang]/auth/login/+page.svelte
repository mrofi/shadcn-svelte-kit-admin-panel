<script lang="ts">
	import { Button } from "@/components/ui/button";
	import type { PageData } from "./$types.js";
	// import AuthLayout from "$lib/layouts/auth.layout.svelte";

	import LoginForm from "./(form)/form.svelte";
	import { LoaderCircle } from "lucide-svelte";
	import { Google } from "@/components/ui/icons";
	import { t } from "@/i18n";

	export let data: PageData;

	let isLoading = false;
	let form = data.form;
  let nextUrl = data.redirectUrl;
</script>

<div class="flex flex-col space-y-6 w-full max-w-[300px]">
  <div class="flex flex-col space-y-2 py-3">
    <h1 class="text-xl tracking-tight">{$t('title')}</h1>
  </div>
  <LoginForm data={form} isLoading={isLoading} nextUrl={nextUrl} />
  <div class="relative">
    <div class="absolute inset-0 flex items-center">
      <span class="w-full border-t"></span>
    </div>
    <div class="relative flex justify-center text-xs">
      <span class="bg-background px-2"> {$t('other_sign_in')} </span>
    </div>
  </div>
  <form method="POST" action={`?/google`} class="flex flex-col">
    <Button variant="outline" type="submit" disabled={isLoading}>
      {#if isLoading}
        <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
      {:else}
        <Google class="mr-2 h-4 w-4" />
      {/if}
      {" "}
      Google
    </Button>
  </form>
  <div class="flex items-center text-xs py-4">
    {$t('have_no_account')}
    <Button
      variant="link"
      href="register"
      class="px-2 text-xs font-light underline"
    >
      {$t('sign_up')}
    </Button>
  </div>
</div>
