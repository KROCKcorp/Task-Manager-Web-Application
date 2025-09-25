import {useState} from 'react'
import {Link} from 'react-router-dom'

function ImageWithStates({src, alt}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className='relative w-full h-40 bg-gray-100 overflow-hidden rounded-md'>
      {!loaded && !error && <div className='absolute inset-0 animate-pulse bg-gray-200' />}
      {error && (
        <div className='absolute inset-0 flex items-center justify-center text-gray-400 text-sm'>Image unavailable</div>
      )}
      {!error && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover ${
            loaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
          loading='lazy'
        />
      )}
    </div>
  )
}

export default function TaskCard({task, categoryName}) {
  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4'>
      {task.image_url ? (
        <div className='w-28 shrink-0'>
          <ImageWithStates src={task.image_url} alt={task.title} />
        </div>
      ) : (
        <div className='w-28 h-40 shrink-0 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-sm'>
          No image
        </div>
      )}
      <div className='flex-1 min-w-0'>
        <div className='flex items-start justify-between gap-2'>
          <h3 className='text-base font-semibold text-gray-900 truncate'>{task.title}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full shrink-0 ${
              task.completed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        {categoryName && <div className='mt-1 text-xs text-gray-500'>{categoryName}</div>}
        {task.description && <p className='mt-2 text-sm text-gray-600 line-clamp-3'>{task.description}</p>}
        <div className='mt-3'>
          <Link to={`/tasks/${task.id}`} className='text-sm text-blue-600 hover:text-blue-700 font-medium'>
            View details
          </Link>
        </div>
      </div>
    </div>
  )
}
