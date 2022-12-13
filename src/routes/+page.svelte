<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  let { events } = data;
</script>

<h1 class="text-4xl">Welcome to a very unfinished scrapbook.svelte</h1>

<div class="p-4" />

<a href="/test-markdown" class="text-blue-700 hover:underline">A page using markdown</a>

<div class="p-4" />

<h2 class="text-3xl">Events</h2>

<div class="p-2" />

<div class="grid grid-cols-2 gap-4 items-start">
  {#each events as event}
  <div class="text-gray-600 justify-self-end">
      {event.metadata.date}
  </div>
  <div class="flex flex-col">
    <a href="/event/{event.URI}" class="hover:underline font-bold">{event.metadata.name}</a>
    <p class="text-gray-500">{event.metadata.tags && event.metadata.tags.join(' | ') || ''}</p>
    <p>{event.metadata.people || ''}</p>
  </div>
  {/each}
</div>
