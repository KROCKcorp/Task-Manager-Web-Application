import {useState} from 'react'
import {Link} from 'react-router-dom'

function ImageWithStates({src, alt}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className="relative w-full h-40 bg-gray-100 overflow-hidden rounded-md">
      {!loaded && !error && <div className="absolute inset-0 animate-pulse bg-gray-200" />}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">Image unavailable</div>
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
          loading="lazy"
        />
      )}
    </div>
  )
}

export default function TaskCard({task, categoryName, color}) {
  const priorityColors = {
    low: 'text-green-600',
    medium: 'text-amber-600',
    high: 'text-red-600',
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex gap-4 hover:scale-102 transition-all ">
      <div className="flex w-30 shrink-0">
        <div className="mr-2 w-2 rounded h-40" style={{backgroundColor: color || '#e5e7eb'}} />
        <ImageWithStates src={task.image_url} alt={task.title} />
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        {' '}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-700 truncate">{task.title}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full shrink-0 ${
              task.completed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}
          >
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        {categoryName && (
          <div className="mt-1 text-xs font-bold text-gray-500" style={{color: color || '#e5e7eb'}}>
            {categoryName}
          </div>
        )}
        {task.description && <p className="mt-2 text-sm font-normal text-gray-500 line-clamp-3">{task.description}</p>}
        <div className="flex justify-end mt-auto">
          <p className={`text-sm font-medium ${priorityColors[task.priority]}`}>{task.priority} priority</p>
        </div>
      </div>
    </div>
  )
}
