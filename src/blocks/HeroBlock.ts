import { Block } from 'payload';

export const HeroBlock: Block = {
    slug: 'hero',
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
        },
        {
            name: 'subheading',
            type: 'richText',
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        }
    ],
}