import parseMD from 'parse-md';
import type { PageServerLoad } from './$types';
import * as fs from 'fs';
import * as path from 'path';

// const fileContents = fs.readFileSync('posts/first.md', 'utf8');
// const { metadata, content } = parseMD(fileContents);
interface Metadata {
	name: string;
	date: string;
	tags: string[] | null;
	people: string[] | null;
}
export const load: PageServerLoad = async ({}) => {
	// devents irectory path
	const dir = './static/events';

	// list all dirs in the ./static/events directory
	const eventsURIs = fs.readdirSync(dir);

	// for each event parse the corresponding markdown page to extract metadata
	const events = eventsURIs
		.map((eventDir) => {
			let eventMD = fs.readFileSync(path.join(dir, eventDir, '/+page.md'), 'utf8');
			let { metadata } = parseMD(eventMD) as { metadata: Metadata; content: string };
			return { URI: eventDir, metadata: metadata };
		})
		// sort the events by date in ascending order
		.sort((a, b) => new Date(a.metadata.date).getTime() - new Date(b.metadata.date).getTime());

	return { events };
};
