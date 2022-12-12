If you're here, I assume you're planning to fork this project and take a stab at making the basic structure work.

## What I've done so far

I've mostly been following [this blog post](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog). I have:

- Set up a skeleton project svelte project using `npm create svelte@latest my-app`
- Added `mdsvex` so that we can compile markdown. Added a dummy route `src/routes/test-markdown` to verify that it works.
- Added a dynamic route for each event that doesn't actually work yet: `src/routes/event/`
- I added two fake events in `/static/events`
  - Each event has a markdown file for metadata
  - It also has an `images` subdirectory with a few fake stock images
- Ran `npm i -D @sveltejs/adapter-static@next` and updated `svelte.config.js` to use it.

## What I'd like you to do

- Make the homepage dynamically generate the list of events and use the metadata from the markdown files.
- Update the dynamic event route to discover the images from each event and _display them sorted chronologically_. Like I said in the `README.md`, using an npm package such as [jpeg-exif](https://www.npmjs.com/package/jpeg-exif) is one way to extract the Date/Time of each picture automatically.
- Make all of this work both using `npm run dev` and `npm run build`.

### Additional comments

- You are free to restructure anything I have in this project in whatever way you'd like. I make no claims that I've set this up in the right way.
- Don't spend much time on styling. What I care most about is getting the structure of the project working correctly. I am happy to spend time on styling later.
