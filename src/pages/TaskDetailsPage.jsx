import {useLocation, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import ImageWithFallback from '../components/ImageWithFallback'
import ToggleBtn from '../components/ToggleBtn'
import {updateTask, deleteTask} from '../api/tasks'
import {MdDelete} from 'react-icons/md'
import {BiSolidEdit} from 'react-icons/bi'
import {priorityColors} from '../constants/constants'
import toast from 'react-hot-toast'
import {PiWarningOctagonFill} from 'react-icons/pi'

export default function TaskDetailPage() {
  const {state} = useLocation()
  const task = state?.task
  const category = state?.category
  const qc = useQueryClient()
  const [completed, setCompleted] = useState(task?.completed)
  const navigate = useNavigate()

  const {mutate: toggleCompleted, isPending} = useMutation({
    mutationFn: async value => {
      setCompleted(value)
      return await updateTask(task.id, {completed: value})
    },
    onSuccess: async () => {
      await qc.invalidateQueries({queryKey: ['tasks']})
      toast.success('Task status updated successfully')
    },
    onError: error => {
      setCompleted(prev => !prev)
      toast.error(error.message || 'Failed to update task status. Please try again!')
    },
  })

  const {mutate: removeTask, isPending: isDeleting} = useMutation({
    mutationFn: async taskID => {
      return await deleteTask(taskID)
    },
    onSuccess: async () => {
      await qc.invalidateQueries({queryKey: ['tasks']})
      toast.success('Task deleted successfully')
      navigate('/')
    },
    onError: error => {
      toast.error(error.message || 'Failed to delete task. Please try again!')
    },
  })

  return (
    <div className='flex flex-col bg-white p-10 rounded-2xl w-full'>
      <h1 className='text-2xl font-bold text-indigo-400'>{task?.title}</h1>
      <div className='flex flex-col sm:flex-row sm:grid-cols-2 mt-10 gap-8'>
        <div>
          <ImageWithFallback src={task.image_url} alt={task.title} />
        </div>
        <div className='flex flex-col'>
          <div>
            <h3 className='text-indigo-400 font-semibold text-lg mb-2'>Description:</h3>
            <p className='text-gray-500'>
              {task?.description?.length === 0 || !task.description
                ? '- There is no description for this task!'
                : task.description}
            </p>
          </div>
          <p
            className={`${priorityColors[task?.priority]} flex flex-nowrap items-center font-semibold mt-4 sm:mt-auto`}>
            <PiWarningOctagonFill className='mr-2' size={20} />
            {task?.priority} priority
          </p>
        </div>
      </div>

      <div className='h-2 my-4 rounded-2xl' style={{backgroundColor: category?.color}}></div>

      <div>
        <h3 className='text-indigo-400 font-semibold text-lg mb-2'>Task Details:</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
          <p className='text-gray-700 font-semibold'>
            Category: <span style={{color: category?.color}}>{category?.name}</span>
          </p>
          <p className='text-gray-700 font-semibold'>
            Due Date: <span className='font-normal'>{task?.due_date}</span>
          </p>
          <p className='text-gray-700 font-semibold'>
            Creation Date: <span className='font-normal'>{task?.created_at?.split('T')[0] || 'unknown'}</span>{' '}
          </p>
          <p className='text-gray-700 font-semibold'>
            Last Update: <span className='font-normal'>{task?.updated_at?.split('T')[0] || 'unknown'}</span>
          </p>
        </div>
      </div>

      <div className='flex backdropColor p-4 mt-10 rounded-xl items-center justify-between'>
        <ToggleBtn
          id='task-completed-toggle'
          checked={completed}
          onChange={checked => toggleCompleted(checked)}
          disabled={isPending}
          labelChecked='Completed'
          labelUnchecked='Pending'
        />

        <div className='flex items-center'>
          <MdDelete
            className='text-red-500 size-6 cursor-pointer'
            onClick={() => removeTask(task?.id)}
            disabled={isDeleting}
          />

          <BiSolidEdit
            className='text-indigo-500 size-6 cursor-pointer ml-4'
            onClick={() => {
              navigate(`/tasks/${task?.id}/edit`)
            }}
          />
        </div>
      </div>
    </div>
  )
}
