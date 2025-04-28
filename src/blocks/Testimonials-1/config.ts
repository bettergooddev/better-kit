import type { Block } from 'payload'

export const Testimonials1: Block = {
  slug: 'testimonials1',
  interfaceName: 'Testimonials1Block',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Section Heading',
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials1',
      hasMany: true,
      admin: {
        // disabled: true,
        description: 'This field automatically includes all testimonials',
        hidden: true,
      },
    },
  ],
}
