import type { ImageMetadata } from 'astro';

// Every photo here is a picsum.photos placeholder. Swap the files in src/assets/photos
// and update the captions when the real work arrives.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });

function photo(name: string): ImageMetadata {
  const key = `../assets/photos/${name}.jpg`;
  const mod = files[key];
  if (!mod) throw new Error(`Missing photo asset: ${key}`);
  return mod.default;
}

export type Photo = {
  src: ImageMetadata;
  alt: string;
  caption: string;
  place?: string;
};

export type Series = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  intro: string;
  cover: Photo;
  photos: Photo[];
};

const p = (name: string, alt: string, caption: string, place?: string): Photo => ({
  src: photo(name),
  alt,
  caption,
  place,
});

export const series: Series[] = [
  {
    slug: 'coast',
    title: 'Coast',
    year: '2023 - 2026',
    summary: 'The Atlantic edge of the Cape, photographed in flat light.',
    intro:
      'An ongoing study of the Cape coastline from Kommetjie to Paternoster. Shot in winter, mostly before eight in the morning, when the sea and the sky share one colour.',
    cover: p('coast-05', 'Wooden jetty reaching into calm grey water under an overcast sky', 'Jetty', 'Langebaan'),
    photos: [
      p('coast-01', 'River mouth meeting the sea with low hills behind', 'River mouth', 'Kommetjie'),
      p('coast-05', 'Wooden jetty reaching into calm grey water under an overcast sky', 'Jetty', 'Langebaan'),
      p('coast-02', 'Dark rocks and pale sand with the tide out', 'Low tide', 'Scarborough'),
      p('coast-03', 'Driftwood on a shoreline with a still bay behind', 'Driftwood', 'Betty’s Bay'),
      p('coast-04', 'A long pier in silhouette over a bright sea', 'Pier', 'Kalk Bay'),
      p('coast-06', 'A single red boat on turquoise water seen from above', 'Red boat', 'Hout Bay'),
      p('coast-07', 'Aerial view of a coastline with pale surf', 'Surf line', 'Noordhoek'),
      p('coast-08', 'Black and white view of a beach shelter under heavy cloud', 'Shelter', 'Paternoster'),
    ],
  },
  {
    slug: 'portraits',
    title: 'Portraits',
    year: '2021 - 2026',
    summary: 'People in the places they belong to, made slowly.',
    intro:
      'Commissioned and personal portraits. Most are made over an afternoon, outdoors, with the subject doing something ordinary. Nothing is retouched beyond what a print would need.',
    cover: p('portrait-07', 'A hiker seen from behind on a rocky ridge above a valley', 'Ridge', 'Silvermine'),
    photos: [
      p('portrait-02', 'A fisherman standing at the edge of the surf at sunset', 'Fisherman', 'Strand'),
      p('portrait-01', 'A man crossing an empty road, seen from above', 'Crossing', 'Woodstock'),
      p('portrait-04', 'A woman in a field at golden hour, face turned away', 'Late light', 'Philadelphia'),
      p('portrait-03', 'A woman in sunglasses standing in tall grass', 'Summer', 'Darling'),
      p('portrait-06', 'A couple on a bench looking out at the sea', 'The bench', 'Muizenberg'),
      p('portrait-05', 'Hands holding an old film camera, black and white', 'Camera', 'Observatory'),
      p('portrait-07', 'A hiker seen from behind on a rocky ridge above a valley', 'Ridge', 'Silvermine'),
      p('portrait-08', 'A person walking through a dry field in soft light', 'Walk', 'Stellenbosch'),
    ],
  },
  {
    slug: 'still',
    title: 'Still',
    year: '2022 - 2025',
    summary: 'Objects, surfaces and small things at close range.',
    intro:
      'Still life for product and interiors clients, and a slower personal series of things found on walks. Natural light, one reflector, no sets.',
    cover: p('still-08', 'Peeling paint on a rusted metal surface', 'Rust'),
    photos: [
      p('still-01', 'An open book lit from one side', 'Open book'),
      p('still-04', 'Frost on grass, black and white, close range', 'Frost'),
      p('still-02', 'A flat lay of cameras, lenses and leather goods', 'Kit'),
      p('still-03', 'Water droplets on a blue surface', 'Droplets'),
      p('still-05', 'Pine cones on a wooden surface, black and white', 'Pine cones'),
      p('still-06', 'The spokes of an old wagon wheel', 'Wheel'),
      p('still-07', 'Acorns on a weathered wooden plank', 'Acorns'),
      p('still-08', 'Peeling paint on a rusted metal surface', 'Rust'),
    ],
  },
  {
    slug: 'city',
    title: 'City',
    year: '2020 - 2026',
    summary: 'Buildings and the streets between them.',
    intro:
      'Architecture and street work for practices and publications. Buildings are photographed over a full day so the light can be chosen rather than accepted.',
    cover: p('city-05', 'A chateau at the end of a long gravel avenue', 'Avenue'),
    photos: [
      p('city-05', 'A chateau at the end of a long gravel avenue', 'Avenue'),
      p('city-01', 'A narrow city street between tall brick buildings', 'Long Street'),
      p('city-02', 'A brutalist concrete building against a white sky', 'Concrete'),
      p('city-04', 'The steel roof structure of a railway station, seen from below', 'Station'),
      p('city-03', 'A city skyline reflected in a river at dusk', 'Dusk'),
      p('city-06', 'Canal houses with boats moored in front', 'Canal'),
      p('city-08', 'Rain on a window in front of an apartment block', 'Rain'),
      p('city-07', 'A college courtyard with a cut lawn and gothic facade', 'Courtyard'),
    ],
  },
];

export const hero = p(
  'hero',
  'A misty valley with a river winding between dark hills, a lichen covered boulder in the foreground',
  'Valley',
  'Bainskloof',
);

export const portraitOfPhotographer = p('portrait-05', 'Hands holding a film camera', 'Studio');

export function getSeries(slug: string) {
  return series.find((s) => s.slug === slug);
}
