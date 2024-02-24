import { cn } from '@/lib/utils'

export interface Props {
  title: string
  win: number
  lose: number
}

const ScoreTable = ({ title, win, lose }: Props) => {
  return (
    <div
      className={`flex items-center h-20 transition duration-500 ease-in-out delay-150 border border-t-4 rounded-lg shadow-lg w-60 border-slate-100 hover:-translate-y-1 hover:scale-110 ${cn(
        win > lose ? 'border-t-green-300' : 'border-t-rose-300'
      )}`}
    >
      <div className='grid w-full h-full grid-cols-2 px-6 divide-x-2'>
        <div className='flex items-center justify-between w-full h-full '>
          <h2 className='text-xl font-bold'>{title}</h2>
        </div>
        <div className='flex items-center justify-end gap-3'>
          <h2
            className={`text-xl font-bold ${cn(
              win > lose ? 'text-green-400' : 'text-red-400'
            )}`}
          >
            {win}
          </h2>
          <h2 className='text-xl font-bold'>-</h2>
          <h2 className='text-xl font-bold'>{lose}</h2>
        </div>
      </div>
    </div>
  )
}

export default ScoreTable
