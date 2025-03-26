// https://github.com/payloadcms/payload/discussions/584#discussioncomment-11447198
import lodash from 'lodash'
import { Field } from 'payload'

const { merge } = lodash

type Slug = (options?: { trackingField?: string }, overrides?: Partial<Field>) => Field

export const slug: Slug = ({ trackingField = 'title' } = {}, overrides) =>
    merge<Field, Partial<Field> | undefined>(
        {
            name: 'slug',
            unique: true,
            type: 'text',
            admin: {
                position: 'sidebar',
                readOnly: true,
                components: {
                    Field: {
                        path: '@/ui/SlugInput',
                        clientProps: {
                            trackingField,
                        },
                    },
                },
            },
        },
        overrides,
    )