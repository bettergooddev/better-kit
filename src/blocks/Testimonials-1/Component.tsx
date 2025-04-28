import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { Testimonials1Block as Testimonials1BlockProps } from '@/payload-types'
import { TestimonialsCarousel } from '@/components/Testimonials-1'

export const Testimonials1Block: React.FC<Testimonials1BlockProps> = (props) => {
  const { heading, testimonials } = props

  return (
    <>
      {testimonials && (
        <div className="mx-auto">
          <h2 className="-mt-6 mb-heading text-center">{heading}</h2>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      )}
    </>
  )
}
