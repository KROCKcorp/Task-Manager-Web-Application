import ImageWithFallback from './ImageWithFallback'
import {priorityColors} from '../constants/constants'
import {PiWarningOctagonFill} from 'react-icons/pi'

export default function TaskCard({task, categoryName, color}) {
  return (
    <div className='bg-white rounded-xl shadow-md p-4 flex gap-4 hover:scale-102 transition-all '>
      <div className='flex w-30 shrink-0'>
        <div className='mr-2 w-2 rounded h-40' style={{backgroundColor: color || '#e5e7eb'}} />
        <ImageWithFallback src={task?.image_url} alt={task.title} />
      </div>
      <div className='flex-1 min-w-0 flex flex-col'>
        <div className='flex items-start justify-between gap-2'>
          <h3 className='text-base font-semibold text-gray-700 truncate'>{task?.title}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full shrink-0 ${
              task.completed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        {categoryName && (
          <div className='mt-1 text-xs font-bold text-gray-500' style={{color: color || '#e5e7eb'}}>
            {categoryName}
          </div>
        )}
        <p className='mt-2 text-sm font-normal text-gray-500 line-clamp-3'>
          {task.description?.length === 0 || !task.description ? '- There is no description for this task!' : task.description}
        </p>
        <div className='flex justify-end mt-auto'>
          <p className={`flex flex-nowrap items-center text-sm font-medium ${priorityColors[task?.priority]}`}>
            <PiWarningOctagonFill className='mr-2' size={20} />
            {task?.priority} priority
          </p>
        </div>
      </div>
    </div>
  )
}
