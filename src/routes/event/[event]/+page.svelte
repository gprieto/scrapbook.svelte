<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
  let { event, images } = data;
</script>

<button class="absolute top-0 left-0 hover:underline" on:click={()=>goto('/')}> {'< '} All events </button>

<h1 class="text-4xl">{event.metadata.name}</h1>

<div class="p-2" />

<div class="grid grid-cols-2 gap-4">
  {#each Object.entries(event.metadata).filter(([key,_]) =>key!=='name') as [property, value]}
  <p class="justify-self-end font-bold">
    {property}
  </p>
  <p>{value}</p>
  {/each}
</div>

<div class="p-4" />

<h2 class="text-3xl">Image Gallery</h2>

<div class="p-2" />

<div class="flex flex-wrap gap-4">
  {#each images as image}
  <figure>
    <img src={image.URI} alt="" class="h-[400px] object-scale-down"/>
    <figcaption class="text-gray-500 text-right pr-1">{new Date(image.date*1000).toDateString()}</figcaption>
  </figure>

  {/each}
</div>