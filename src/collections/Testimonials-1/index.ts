import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { syncTestimonialsWithPage } from './hooks/syncTestimonialsWithPage'

export const Testimonials1: CollectionConfig = {
  slug: 'testimonials1',
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
      hasMany: false,
      admin: {
        isClearable: true,
      },
      options: [
        {
          label: 'Product 1',
          value: 'product-1',
        },
        {
          label: 'Product 2',
          value: 'product-2',
        },
        {
          label: 'Product 3',
          value: 'product-3',
        },
      ],
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
