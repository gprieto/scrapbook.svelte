import parseMD from 'parse-md';
import type { PageServerLoad } from './$types';
import * as fs from 'fs';
import * as path from 'path';
import { ExifParserFactory } from 'ts-exif-parser';

interface Metadata {
	name: string;
	date: string;
	tags: string[] | null;
	people: string[] | null;
}

export const load: PageServerLoad = async ({ params }) => {
	// directory path
	const dir = './static/events';
	// list all files in the directory
	const eventURI = params.event;

	// files object contains all files names
	// log them on console
	let eventMD = fs.readFileSync(path.join(dir, eventURI, '/+page.md'), 'utf8');
	let { metadata } = parseMD(eventMD) as { metadata: Metadata; content: string };
	let event = { URI: eventURI, metadata: metadata };

	// dynamically discover all images inside the static/events/[event]/images/ folder
	const imagesDir = path.join(dir, eventURI, '/images');
	const imagesFiles = fs.readdirSync(imagesDir).map((image) => path.join(imagesDir, image));

	// read the exifdata of all images
	let images = [];
	const sharedBuffer = Buffer.alloc(65635); // use shared buffer to optimize RAM usage
	// (exif data is situated within the first 65635 bytes of the file - no need to read further)

	for (let imageFile of imagesFiles) {
		const fd = fs.openSync(imageFile, 'r'); // file descriptor
		const image = (await readBytes(fd, sharedBuffer)) as Buffer;
		const exifdata = ExifParserFactory.create(image).parse();

		const imageFileBuild = path.join('/', ...imageFile.split('/').splice(1)); // use build path for img tags
		images.push({ URI: imageFileBuild, date: exifdata.tags?.DateTimeOriginal || 0 });
	}

	// short images by date in ascending order
	images = images.sort((a, b) => a.date - b.date);

	return { event, images };
};

// helper function to ready only the size of buffer from file
function readBytes(fd:number, sharedBuffer:Buffer) {
	return new Promise((resolve, reject) => {
		fs.read(fd, sharedBuffer, 0, sharedBuffer.length, null, (err,_,buffer) => {
			if (err) {
				return reject(err);
			}
			resolve(buffer);
		});
	});
}