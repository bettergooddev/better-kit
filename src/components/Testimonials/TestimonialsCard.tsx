import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'

import { CarouselItem } from 'src/components/ui/carousel'
import { Testimonial } from 'src/payload-types'
import { cn } from 'src/utilities/ui'
import { ImageMedia } from 'src/components/Media/ImageMedia'
import { Media } from 'src/components/Media'
import { Badge } from 'src/components/ui/badge'

export function TestimonialsCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial
  className: string
}) {
  const { standout, body, offering } = testimonial
  const { name, role, image } = testimonial.author
  const badge = 'TODO'

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
