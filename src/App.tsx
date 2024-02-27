import ScoreTable from './components/ScoreTable'
import { AVATARROSTER, SCORE } from './config/data'
import ScoreChart from './components/ScoreChart'
import CondolenceArea from './components/CondolenceArea'
import CondolenceList from './components/CondolenceList'
import AvatarRoster from './components/AvatarRoster'
import { useEffect, useState } from 'react'
import { getData } from './api/api.ts'
import { Comments } from './interface/comment.ts'
import { Toaster } from 'react-hot-toast'
import { Input } from './components/ui/input.tsx'

function App() {
  const [comments, setComments] = useState<Comments[]>([])
  const [auxComments, setAuxComments] = useState<Comments[]>([])
  const [newComment, setNewComment] = useState(false)

  const [visibleComments, setVisibleComments] = useState<Comments[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(1)

  useEffect(() => {
    fetchComments()
    setNewComment(false)
  }, [newComment])

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      setEndIndex((prevIndex) => prevIndex + 5)
    }
  }
  useEffect(() => {
    setStartIndex(0)
    setEndIndex(10)
  }, [comments])

  useEffect(() => {
    setVisibleComments(comments.slice(startIndex, endIndex))
  }, [startIndex, endIndex, comments])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const fetchComments = async () => {
    try {
      const comments = await getData()
      setComments(comments)
      setAuxComments(comments)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const filterData = (name: string) => {
    const filteredData = auxComments.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    )

    setComments(filteredData)
  }

  return (
    <>
      <div className='sticky top-0 z-50 flex w-full h-10 overflow-x-hidden bg-rose-500'>
        <p className='w-full text-2xl font-bold text-center text-white animate-marquee'>
          CADENA DE ORACIÓN A LAS 20:00
        </p>
      </div>
      <div className='w-full h-[100vh] py-6 px-6'>
        <div className='flex justify-center'>
          <div>
            <h1 className='text-6xl font-bold md:text-9xl text-muted-foreground'>
              LOS KINGS
            </h1>
          </div>
        </div>
        <div className='flex flex-wrap justify-center gap-6 pt-20'>
          {AVATARROSTER.map((e) => (
            <AvatarRoster
              key={e.id}
              name={e.name}
              img={e.img}
              CN={e.CN}
              href={e.href}
            />
          ))}
        </div>
        <section>
          <h1 className='py-20 text-3xl font-bold text-center md:text-6xl text-rose-500'>
            PARTIDAS
          </h1>
          <div className='flex flex-wrap justify-center gap-6 px-6'>
            {SCORE.map((e) => (
              <ScoreTable
                key={e.title}
                title={e.title}
                win={e.win}
                lose={e.lose}
              />
            ))}
          </div>
          <div className='flex justify-center gap-6 py-10'>
            <h2 className='text-4xl font-bold'>OVERALL</h2>
            <h3 className='text-4xl font-bold'>
              <span className='text-rose-400'>5</span> - 12
            </h3>
          </div>
        </section>
        <section>
          <h1 className='py-20 text-3xl font-bold text-center md:text-6xl text-rose-500'>
            ¿ QUE DICE LA IA ?
          </h1>
          <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center w-auto h-auto px-6'>
              <p className='p-6 text-3xl text-center text-muted-foreground'>
                Basado en los resultados anteriores de tus partidos, donde has
                ganado 5 de 17 partidos, es posible que puedas ganar alguna de
                las siguientes 3 partidas. Sin embargo, debido a que la
                probabilidad de victoria para tu equipo es relativamente baja
                (aproximadamente 29.4%), también existe la posibilidad de que
                pierdas los tres partidos.
              </p>
            </div>
            <div>
              <ScoreChart />
            </div>
          </div>
        </section>
        <section>
          <h1 className='py-20 text-3xl font-bold text-center md:text-6xl text-rose-500'>
            DEJA TUS PLEGARIAS
          </h1>
          <div className='md:grid md:grid-cols-2'>
            <div className='flex items-center justify-center w-full'>
              <CondolenceArea setNewComment={setNewComment} />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <img
                className='w-80 h-80'
                src='/assets/praykings.png'
                alt='prayForTheKings'
              />
              <p className='text-lg font-bold text-rose-500'>
                PRAY FOR THE KINGS
              </p>
            </div>
          </div>
        </section>
        <section>
          <h1 className='pt-16 pb-10 text-3xl font-bold text-center md:text-6xl text-rose-500'>
            MURO DE LAS PLEGARIAS
            <p className='text-xl text-center text-muted-foreground text-slate-300'>
              (Se resetean todos los días)
            </p>
          </h1>
          <div className='flex items-center justify-center w-full pb-10'>
            <div className=' w-[50%]'>
              <Input
                type='text'
                placeholder='Buscar por nombre (Sin @)...'
                className='border-b-6'
                onChange={(e) => filterData(e.target.value)}
              ></Input>
            </div>
          </div>
          <div className='flex flex-wrap justify-center gap-6'>
            {visibleComments.map((e) => (
              <CondolenceList
                key={e._id}
                name={e.name}
                message={e.comment}
                date={e.createdAt}
              />
            ))}
          </div>
        </section>
        <footer>
          <div className='w-full max-w-screen-xl p-4 mx-auto md:py-8'>
            <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
            <span className='block text-sm text-center text-gray-500 sm:text-center dark:text-gray-400'>
              © 2024 ORUDEI. All Rights Reserved.
            </span>
          </div>
        </footer>
        <Toaster />
      </div>
    </>
  )
}

export default App
