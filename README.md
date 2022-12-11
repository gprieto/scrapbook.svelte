# scrapbook.svelte

At a high level, the website I'm trying to build is effectively a static scrapbook. I have a series of events. Each event has some metadata associated with it (e.g. `name`, `date`, `tags`, `people`, and `description`) as well as a list of images (an image gallery). One of those images is the `thumbnail` for that event.

Here are some more details about how I imaged the site to work (I'm not particularly tied to this):

- The homepage would list each event in chronological order. For each event, it would display the `name`, the `date`, the `thumbnail` image, and the list of `tags` and `people`.
- The homepage would provide some affordance to filter the list of events based on `tags` or `people`.
- If you click on an event from the homepage, you'd go to that event's page. On an event's page, you would see all the metadata for the event as well as an image gallery. The image gallery should display all that event's images in chronological order.

### Technical Requirements

Here are a few technical requirements:

- I'd like this to be a **static** site, as in fully pre-rendered with no backend necessary.
- I want the images in each event's gallery to be discovered automatically. I don't want to, for example, manually write out an `<img>`tag for each picture. I want to be able to copy an image into some folder within my project and for the site to automatically update incorporating that image.
- I want images in the gallery to be **automatically sorted chronologically**. If I was using node, I would use something like the [jpeg-exif](https://www.npmjs.com/package/jpeg-exif) package to extract the exif data from a picture. Exif data exposes the `DateTimeOriginal` property.
- I'd like to optimize for the developer experience. I'd like it to be as easy as possible to add events and make changes to the site. For example:
  - I'd be sad if our solution required me to copy the same `+page.js` for every event (because that means making a change would require making the same change in many duplicated files).
  - Similarly, I'd be a little sad if every event required multiple similarly named directories in different places within the app. I could probably live with this though :). One directory per event would be optimal.

### Where I need (the most) help

I could probably benefit from help in lots of places, but so far the areas in which I'm having the most trouble relates to importing images in a static site. In particular, some things I try work when running `npm run dev` (i.e. `vite dev`), but fail when I then try to build/pre-render the entire site using `npm run build` (i.e. `vite build`).

Here's an example. `Sveltekit` (`vite` actually) provides a magical [import](https://vitejs.dev/guide/features.html#glob-import) function which I can use to find and import assets (images in my case). When running `npm run dev`, the asset URLs look like `/src/routes/posts/c/images/foo.jpg` but after running `npm run build` and then serving the site locally the URLs look more like `_app/immutable/assets/foo.jpg`.

This is neat! However, there's a lot of "magic" going on behind that scenes that I don't fully understand and it makes it harder for me to extend things. For example, I want to make a server route/API that can, for any image URL, return the exif data for that image. This works fine when running `npm run dev` because the image URLs look like file paths, but it doesn't work when running `npm run build`.

> Update: After a few different people asked why I was talking about a server API on a static site, let me clarify. The thing I want, which maybe doesn't need a server API, is to extract the exif data from my images so that I can sort them chronologically. I'm open to whatever the right way of doing that is, but I happen to know how to make it work from a +server.js file.

Anyways, I hope that gives you an idea of the type of questions that I will be asking. If these sorts of questions are outside your area of expertise, please be honest and let me know so that we don't waste each other's time. Thank you!
