import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'lowImpact',
    richText: [],
    links: [],
    media: '',
  },
  meta: {
    title: 'Art Gallery',
    description: 'A collection of art',
    image: '{{IMAGE}}',
  },
  title: 'Home',
  layout: [
    {
      blockName: 'Pixel Art Grid',
      blockType: 'artGrid',
      images: [
        {
          src: '/images/red-house_640.png',
          alt: 'Red House Pixel Art',
        },
        {
          src: '/images/spyro_640.png',
          alt: 'Spyro Pixel Art',
        },
        {
          src: '/images/phoenix-arizona_640.png',
          alt: 'Phoenix Arizona Pixel Art',
        },
        {
          src: '/images/pigeon_768.gif',
          alt: 'Pigeon Pixel Art',
        },
        {
          src: '/images/oh-the-ironing_640.png',
          alt: 'Oh The Ironing Pixel Art',
        },
        {
          src: '/images/jigglypuff_640.png',
          alt: 'Jigglypuff Pixel Art',
        },
        {
          src: '/images/duo_640.png',
          alt: 'Duo Pixel Art',
        },
        {
          src: '/images/witch_640.png',
          alt: 'Witch Pixel Art',
        },
        {
          src: '/images/grandma_640.png',
          alt: 'Grandma Pixel Art',
        },
      ],
    },
  ],
  createdAt: '2023-06-14T12:00:00.000Z',
  updatedAt: '2023-06-14T12:00:00.000Z',
}
