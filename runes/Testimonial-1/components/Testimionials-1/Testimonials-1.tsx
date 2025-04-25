import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { CarouselItem } from '@/components/ui/carousel'
import { Offering, Testimonial } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Media } from './Media'
import { getOfferingType } from '@/collections/Offerings/hooks/getOfferingType'
import { Badge } from '@/components/ui/badge'
import { appendKeys } from '../../utilities/appendKeys'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import React from 'react'

function TestimonialsCard({ testimonial, className }: { testimonial: Testimonial; className: string }) {
  const { standout, body, offering } = testimonial
  const { name, role, image } = testimonial.author
  const badge = offering ? getOfferingType(offering as Offering) : null
  return (
    <CarouselItem key={testimonial.id} className={cn(className, 'text-primary')}>
      <div className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-primary-50 p-7">
        <div className="">
          <h3 className="">&ldquo;{standout}&rdquo;</h3>
          <p className="type-caption mt-4 max-w-[48ch] !font-light opacity-65">{body}</p>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="flex items-center gap-4">
            <Avatar className="relative size-10 overflow-hidden rounded-full">
              <Media className="" fill priority resource={image} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="type-caption font-normal">{name}</p>
              <p className="type-caption font-normal opacity-65">{role}</p>
            </div>
          </div>

          {badge && <Badge variant="primary">{badge}</Badge>}
        </div>
      </div>
    </CarouselItem>
  )
}

export function TestimonialsCarousel({
  testimonials: testimonialsProp,
}: {
  testimonials: TestimonialsBlockProps['testimonials']
}) {
  if (!testimonialsProp) return null
  const testimonials = appendKeys(testimonialsProp, { shallow: true })

  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="">
        {testimonials.map((testimonial) => {
          if (typeof testimonial === 'string') return null
          const { key, ...testimonialProps } = testimonial
          return (
            <TestimonialsCard
              key={key}
              testimonial={testimonialProps}
              className="basis-[calc(100%-1.175*2rem)] pl-4 md:basis-[45%] md:pl-8 lg:basis-[29%]"
            />
          )
        })}
      </CarouselContent>

      <div className="mt-8 flex justify-center gap-2">
        <CarouselPrevious className="static mr-2 translate-y-0 transform-none border-primary p-0 [&_*]:stroke-primary" />
        <CarouselNext className="static translate-y-0 transform-none border-primary p-0 [&_*]:stroke-primary" />
      </div>
    </Carousel>
  )
} 