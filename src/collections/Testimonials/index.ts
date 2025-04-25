import type { CollectionConfig } from 'payload'

import { anyone } from 'src/access/anyone'
import { authenticated } from 'src/access/authenticated'
import { syncTestimonialsWithPage } from './hooks/syncTestimonialsWithPage'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'standout',
    defaultColumns: ['name', 'offering', 'standout', 'updatedAt'],
  },
  fields: [
    {
      name: 'standout',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
    },
    {
      name: 'offering',
      type: 'select',
      options: [
        { label: 'Offering 1', value: 'offering1' },
        { label: 'Offering 2', value: 'offering2' },
        { label: 'Offering 3', value: 'offering3' },
      ],
      required: false,
    },
    {
      name: 'author',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      // hidden but enables you to show the author name in the admin table
      name: 'name',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            return data?.author?.name || ''
          },
        ],
        afterRead: [
          ({ data }) => {
            return data?.author?.name || ''
          },
        ],
      },
    },
  ],
  hooks: {
    afterChange: [syncTestimonialsWithPage],
  },
}
