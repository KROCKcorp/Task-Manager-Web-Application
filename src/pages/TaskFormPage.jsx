import {useState, useEffect} from 'react'
import {useNavigate, useParams, useOutletContext} from 'react-router-dom'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {createTask, updateTask, getTask} from '../api/tasks'
import ToggleBtn from '../components/ToggleBtn'
import toast from 'react-hot-toast'
import {defaultFormData} from '../constants/constants'
import TaskFormPageSkeleton from '../components/skeletons/TaskFormPageSkeleton'

export default function TaskFormPage() {
  const navigate = useNavigate()
  const {id} = useParams()
  const {categories, categoriesLoading} = useOutletContext()
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState(defaultFormData)

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditMode = Boolean(id && id !== 'new')

  const {data: task, isLoading} = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTask(id),
    enabled: isEditMode,
  })

  useEffect(() => {
    if (isEditMode && task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        category_id: task.category_id || '',
        due_date: task.due_date ? task.due_date.split('T')[0] : '',
        completed: task.completed || false,
        image_url: task.image_url || '',
      })
    } else {
      setFormData(defaultFormData)
    }
  }, [isEditMode, task])

  const validateForm = () => {
    const newErrors = {}

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length > 255) {
      newErrors.title = 'Title must be 255 characters or less'
    }

    // Priority validation
    if (!['low', 'medium', 'high'].includes(formData.priority)) {
      newErrors.priority = 'Priority must be low, medium, or high'
    }

    // Category validation
    if (!formData.category_id) {
      newErrors.category_id = 'Category is required'
    } else if (categories && !categories.find(cat => cat.id == formData.category_id)) {
      newErrors.category_id = 'Selected category does not exist'
    }

    // Due date validation
    if (formData.due_date) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(formData.due_date)) {
        newErrors.due_date = 'Due date must be in YYYY-MM-DD format'
      } else {
        const selectedDate = new Date(formData.due_date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate < today) {
          newErrors.due_date = 'Due date cannot be in the past'
        }
      }
    } else {
      newErrors.due_date = 'You have to select a Due Date'
    }

    // Image URL validation
    if (formData.image_url && formData.image_url.length > 500) {
      newErrors.image_url = 'Image URL must be 500 characters or less'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = e => {
    const {name, value, type, checked} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const mutation = useMutation({
    mutationFn: taskData => (isEditMode ? updateTask(id, taskData) : createTask(taskData)),
    onSuccess: () => {
      toast.success(
        `${isEditMode ? 'The Task has been updated successfully' : 'Your Task has been created successfully'}`
      )
      queryClient.invalidateQueries({queryKey: ['tasks']})
      navigate('/')
    },
    onError: error => {
      toast.error(error.message || 'There has been an error saving the Task')
      setErrors({general: error.message || 'Failed to save task'})
    },
    onSettled: () => {
      setIsSubmitting(false)
    },
  })

  const handleSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    const taskData = {
      ...formData,
      due_date: formData.due_date || null,
      image_url: formData.image_url || null,
    }

    mutation.mutate(taskData)
  }

  if (isLoading || categoriesLoading) {
    return <TaskFormPageSkeleton />
  }

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-indigo-400">{isEditMode ? 'Edit Task' : 'Create New Task'}</h1>

        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 bg-indigo-100 cursor-pointer  ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter task title"
              maxLength={255}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 bg-indigo-100 cursor-pointer"
              placeholder="Enter task description"
            />
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Priority *
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 bg-indigo-100 cursor-pointer ${
                errors.priority ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && <p className="mt-1 text-sm text-red-600">{errors.priority}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 bg-indigo-100 cursor-pointer ${
                errors.category_id ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              {categories?.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 bg-indigo-100 cursor-pointer ${
                errors.due_date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.due_date && <p className="mt-1 text-sm text-red-600">{errors.due_date}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2 ">
              Image URL
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 bg-indigo-100 cursor-pointer ${
                errors.image_url ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter image URL"
              maxLength={500}
            />
            {errors.image_url && <p className="mt-1 text-sm text-red-600">{errors.image_url}</p>}
          </div>

          {/* Completed */}
          <div>
            <label htmlFor="completed" className="block text-sm font-medium text-gray-700 mb-2">
              Task Status
            </label>
            <ToggleBtn
              id="completed"
              checked={formData.completed}
              onChange={checked => setFormData(prev => ({...prev, completed: checked}))}
              labelChecked="Completed"
              labelUnchecked="Pending"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button type="submit" disabled={isSubmitting} className="flex-1 primaryBtn">
              {isSubmitting ? 'Saving...' : isEditMode ? 'Update Task' : 'Create Task'}
            </button>
            <button type="button" onClick={() => navigate('/')} className="flex-1 secondaryBtn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
