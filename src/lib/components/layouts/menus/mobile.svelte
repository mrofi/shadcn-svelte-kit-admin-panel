<script lang="ts">
  import * as Drawer from "@/components/ui/drawer";
  import MenuIcon from "$lib/components/layouts/menus/icon.svelte";
	import { cn } from "@/utils";
  import { buttonVariants } from "@/components/ui/button";

  let { title, children, class: className = null } = $props();
  let open = $state(false);
</script>

<Drawer.Root bind:open direction="left">
  <Drawer.Trigger class={buttonVariants({ variant: "ghost", size: "icon", class: cn(
      "md:hidden h-6 w-6 flex flex-col justify-center items-end *:h-[1px] *:bg-foreground *:duration-300 hover:bg-transparent focus:ring-transparent focus-visible:ring-transparent *:m-0",
      className
     )})}>
    <MenuIcon transform={open} />
  </Drawer.Trigger>
  <Drawer.Content
    class="left-0 inset-y-0 mt-0 h-full w-[80%] max-w-sm py-1 px-4 rounded-none border-0 outline-none"
    role="button"
    tabindex={0}
    onclick={(event) => {
      const target = event.target as HTMLElement;
      if (target.closest("a")) open = false;
    }}
    onkeydown={(event) => {
      const target = event.target as HTMLElement;
      if ((event.key === "Enter" || event.key === " ") && target.closest("a")) {
        open = false;
      }
    }}
  >
    <Drawer.Header class="text-left relative pl-12">
      <Drawer.Close
        class={
          buttonVariants(
            { variant: "ghost", size: "icon", class: cn(
              "md:hidden absolute top-3 left-0 h-6 w-6 flex flex-col justify-center items-end *:h-[1px] *:bg-foreground *:duration-300 hover:bg-transparent focus:ring-transparent focus-visible:ring-transparent *:m-0",
              className
            )}
          )
        }
      >
        <MenuIcon transform={open} />
      </Drawer.Close>
      <Drawer.Title>
        <a href="/">
          {title}
        </a>
      </Drawer.Title>
     <Drawer.Description>
      <nav class="flex flex-col space-y-6 mt-6 text-sm text-foreground font-normal tracking-wider">
        {@render children?.()}
      </nav>
     </Drawer.Description>
    </Drawer.Header>
  </Drawer.Content>
</Drawer.Root>