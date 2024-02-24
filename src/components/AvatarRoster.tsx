import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export interface Props {
  name: string
  img: string
  CN: string
  href: string
}

const AvatarRoster = ({ name, img, CN, href }: Props) => {
  return (
    <div className='flex flex-col items-center'>
      <a href={href}>
        <Avatar className='w-20 h-20 border-2 shadow-lg border-rose-500 hover:animate-bounce'>
          <AvatarImage src={img} alt='@shadcn' className='object-cover' />
          <AvatarFallback>{CN}</AvatarFallback>
        </Avatar>
        <p className='font-bold text-center text-rose-500'>{name}</p>
      </a>
    </div>
  )
}

export default AvatarRoster
