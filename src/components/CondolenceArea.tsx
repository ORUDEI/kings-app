import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { sendData } from '@/api/api'
import toast from 'react-hot-toast'

interface Props {
  setNewComment: React.Dispatch<React.SetStateAction<boolean>>
}

const CondolenceArea = ({ setNewComment }: Props) => {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const submit = async () => {
    try {
      const text = name
      const cleanedText = text.replace(/[@\s]/g, '')
      const formData = { name: cleanedText, comment }
      const response = await sendData(formData)
      setNewComment(true)
      clearData()
      toast.success(`Gracias ${response.name} por enviar tus plegarias`)
    } catch (error) {
      toast.error(`Oops! Hubo un error: ${error}`)
    }
  }

  const clearData = () => {
    setName('')
    setComment('')
  }

  return (
    <div className='flex-col w-[50%]'>
      <Input
        type='text'
        placeholder='Nombre'
        value={name}
        maxLength={20}
        onChange={(e) => setName(e.target.value)}
      />
      <Textarea
        className='h-40 my-6'
        placeholder='Deja tus plegarias aquí.'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={100}
      />
      <Button
        className='w-full'
        onClick={submit}
        disabled={name.length < 1 || comment.length < 1}
      >
        Enviar
      </Button>
    </div>
  )
}

export default CondolenceArea
