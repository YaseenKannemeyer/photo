// Generates public/og.jpg (1200x630) and public/apple-touch-icon.png from the hero photo and favicon.
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const hero = 'src/assets/photos/hero.jpg';
await sharp(hero).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 82 }).toFile('public/og.jpg');

const svg = await readFile('public/favicon.svg');
await sharp(svg).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(svg).resize(32, 32).png().toFile('public/favicon-32.png');
console.log('og.jpg, apple-touch-icon.png, favicon-32.png written');
