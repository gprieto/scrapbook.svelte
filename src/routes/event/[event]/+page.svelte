<script>
  export let data;
  const { images } = data;
</script>

<h2>Event metadata:</h2>

<h2>Image Gallery:</h2>
{#each images as image}
  <img src={image} alt="" />
{/each}

<style>
  img {
    max-width: 100%;
  }
</style>
