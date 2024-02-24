import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import moment, { Moment } from 'moment'
import { useEffect, useState } from 'react'

export interface Props {
  name: string
  message: string
  date: string
}

const CondolenceList = ({ name, date, message }: Props) => {
  const [formattedDate, setFormattedDate] = useState<string>('')

  useEffect(() => {
    const formatDate = (date: string) => {
      const now: Moment = moment()
      const commentDate: Moment = moment(date)
      const hoursDiff: number = now.diff(commentDate, 'hours')
      const minutesDiff: number = now.diff(commentDate, 'minutes') % 60
    
      if (hoursDiff >= 24) {
        const daysDiff: number = Math.floor(hoursDiff / 24)
        const remainingHours: number = hoursDiff % 24
        return `Hace ${daysDiff} día(s), ${remainingHours} hora(s) y ${minutesDiff} minuto(s)`
      } else {
        return `Hace ${hoursDiff} hora(s) y ${minutesDiff} minuto(s)`
      }
    }

    const commentDate: string = date // Aquí deberías obtener la fecha del comentario desde tus datos

    const formattedCommentDate: string = formatDate(commentDate)
    setFormattedDate(formattedCommentDate)
  }, [])

  return (
    <Card className='w-[90%] md:w-auto h-auto'>
      <CardHeader className='divide-y-2'>
        <CardTitle className='text-rose-600'>@{name}</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent className='h-auto overflow-auto'>
        <p className='whitespace-normal'>{message}</p>
      </CardContent>
    </Card>
  )
}

export default CondolenceList
