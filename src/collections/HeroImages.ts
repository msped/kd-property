import type { CollectionConfig } from 'payload'

export const HeroImages: CollectionConfig = {
    slug: 'hero-images',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'images',
            type: 'array',
            minRows: 1,
            maxRows: 6,
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
    ],
}
