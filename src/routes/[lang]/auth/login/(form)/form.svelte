<script lang="ts">
  import * as Form from "$lib/components/ui/formx";
	import { locale, addTranslations, t } from "$lib/i18n";
	import translation from "./translation.json";
  import { Input } from "$lib/components/ui/input";
	import { EyeClosedIcon, EyeIcon, LoaderCircle } from "lucide-svelte";
  import { formSchema } from "./schema";
  import { superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";
	import { Password } from "@/components/ui/password";
	import { Inputx } from "@/components/ui/inputx";
 
  addTranslations(translation);

  const { formResult, showSuccess, showError } = Form.createFormResult();

  let { data, isLoading = false, nextUrl = '' } = $props();
  const form = superForm(data, {
    delayMs: 500,
    timeoutMs: 8000,
    onError({ result }) {
      showError(result.error.message);
    },
    onResult: ({ result, cancel }) => {
      const type = result.type

      if (type === 'redirect') {
        showSuccess($t('login_form.success'));
        cancel();
        setTimeout(() => goto(result.location), 1000);

        return;
      }

      if (type === 'failure') {
        const errors = result.data?.errors;
        
        if (errors) {
          if (errors.login) {
            showError($t('login_form.invalid_credentials'));
            cancel();
            return;
          }
          form.errors.set(errors);
        }
      }

      if (type === 'error') {
        showError($t('login_form.submit_error'));
      }

      cancel();
    }
  });
 
  
  const { form: formData, enhance, options, errors, allErrors, constraints, delayed } = form;
  options.validators = zod(formSchema($locale))
  let isValid = $state(false);
  $effect(() => {
    isValid = Form.formIsValid($formData, $errors, $constraints);
  });

</script>

<div class="grid gap-6">
  <form method="POST" use:enhance action={`?/login&next=${nextUrl}`}>
    <div class="grid gap-2 space-y-2">
      <Form.Field {form} name="email" class="grid gap-0">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label class="data-[fs-error]:text-normal font-light">Email</Form.Label>
            <Inputx type="email" autocomplete="username" {...props} bind:value={$formData.email} />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors>
          {#snippet children({ errors, errorProps })}
            {#each errors as err}
              <div {...errorProps}>{err}{$formData.email ? `: ${$formData.email}` : ''}</div>
            {/each}
          {/snippet}
        </Form.FieldErrors>
      </Form.Field>
      <Form.Field {form} name="password" class="grid gap-0">
        <Form.Control>
          {#snippet children({ props })}
            <div class="flex justify-between">
              <Form.Label class="data-[fs-error]:text-normal font-light">Password</Form.Label>
              <Button variant="link" tabindex={-1} href="forgot-password" class="text-xs font-light p-0 h-auto">{$t('login_form.forgot_password')}?</Button>
            </div>
            <Password autocomplete="current-password" {...props} bind:value={$formData.password}>
              {#snippet showIcon()}
              <EyeIcon class="h-4 w-4" />
              {/snippet}
              {#snippet hideIcon()}
              <EyeClosedIcon class="h-4 w-4" />
              {/snippet}
            </Password>
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Button disabled={isLoading || !isValid}>
        {#if isLoading || $delayed}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				{$t('login_form.label_button')}
			</Form.Button>
      <Form.Result {formResult} />
    </div>
  </form>
</div>