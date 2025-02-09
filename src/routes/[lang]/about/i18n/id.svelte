<script lang="ts">
  import BaseFront from "@/components/layouts/front-base.svelte";
  import { Button } from "$lib/components/ui/button";
  import { ExternalLink } from "lucide-svelte";
  import { Star } from "svelte-radix";
</script>

<BaseFront>
  <h1 class="text-xl font-semibold">
    Tentang Proyek Ini <br>
    <small class="font-normal">Panel admin yang dibangun dengan Svelte dan shadcn-svelte</small>
  </h1>
  <p class="mt-6">
    Selamat datang di proyek dashboard kami! Kami sedang membangun panel admin yang kuat dan fleksibel menggunakan Svelte dan shadcn-svelte. Proyek ini masih dalam pengembangan aktif, dan kami sangat antusias untuk membagikan kemajuan kami kepada Anda.
  </p>
  <h3 class="text-xl font-semibold mt-6">Fitur Utama</h3>
  <ul class="list-disc list-inside pl-2">
    <li>Desain responsif untuk semua perangkat</li>
    <li>Dukungan mode gelap</li>
    <li>Komponen yang dapat disesuaikan dengan shadcn-svelte</li>
    <li>Autentikasi pengguna dan manajemen peran</li>
    <li>dan masih banyak lagi...</li>
  </ul>
  <h3 class="text-xl font-semibold mt-6">Kemajuan Pengembangan</h3>
  <p>
    Tim kami bekerja keras untuk mewujudkan dashboard ini. Kami terus menambahkan fitur baru, menyempurnakan antarmuka pengguna, dan mengoptimalkan performa. Nantikan pembaruan rutin dari kami!
  </p>

  <div class="flex flex-wrap flex-row items-center space-y-2 justify-between mt-6">
    <Button variant="outline" href="https://www.threads.net/@m_rofi" target="_blank">
      <ExternalLink class="mr-2 h-4 w-4" />
      Ikuti Kemajuan Kami di Threads
    </Button>
    <Button variant="outline" href="https://github.com/roketid/shadcn-svelte-kit-admin-panel" target="_blank">
      <ExternalLink class="mr-2 h-4 w-4" />
      Beri Bintang <Star class="h-4 w-4" /> di GitHub
    </Button>
  </div>
</BaseFront>
