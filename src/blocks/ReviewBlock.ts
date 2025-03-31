import { Block } from 'payload';

export const ReviewBlock: Block = {
    slug: 'review',
    fields: [
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'client',
            type: 'text',
            required: false,
        },
    ]
}