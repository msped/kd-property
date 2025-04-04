import type { CollectionConfig } from 'payload'
import { slug } from '@/fields/slug';
import { HeroBlock } from '@/blocks/HeroBlock';
import { ContentBlock } from '@/blocks/ContentBlock'
import { ImageBlock } from '@/blocks/ImageBlock';
import { ReviewBlock } from '@/blocks/ReviewBlock';

export const Testimonials: CollectionConfig = {
    slug: 'testimonials',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        slug({ trackingField: 'title' }),
        {
            name: 'layout',
            type: 'blocks',
            required: true,
            blocks: [
                HeroBlock, ContentBlock, ImageBlock, ReviewBlock
            ]
        },
        {
            name: 'date',
            type: 'date',
            required: true,
        }
    ],
};
