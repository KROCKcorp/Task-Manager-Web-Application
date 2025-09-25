import {useMemo, useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {Link, useOutletContext} from 'react-router-dom'
import {getTasks} from '../api/tasks'
import TaskCard from '../components/TaskCard'
import PaginationBar from '../components/PaginationBar'

export default function TaskListPage() {
  const {categories, categoriesLoading, categoriesError} = useOutletContext()
  const [selectedCategoryId, setSelectedCategoryId] = useState('all')
  const [completedFilter, setCompletedFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [page, setPage] = useState(1)
  const pageSize = 12

  const completedParam = completedFilter === 'all' ? undefined : completedFilter === 'completed'
  const priorityParam = priorityFilter === 'all' ? undefined : priorityFilter
  const offset = (page - 1) * pageSize

  const {
    data: tasksResp,
    isLoading: tasksLoading,
    isError: tasksError,
    refetch,
  } = useQuery({
    queryKey: [
      'tasks',
      {categoryId: selectedCategoryId, completed: completedParam, priority: priorityParam, page, pageSize},
    ],
    queryFn: () =>
      getTasks({
        categoryId: selectedCategoryId === 'all' ? undefined : selectedCategoryId,
        completed: completedParam,
        priority: priorityParam,
        limit: pageSize,
        offset,
      }),
    keepPreviousData: true,
    staleTime: 30_000,
  })

  const categoryOptions = useMemo(() => {
    const opts = [{id: 'all', name: 'All'}]
    if (Array.isArray(categories)) return [...opts, ...categories]
    return opts
  }, [categories])

  const isLoading = tasksLoading || categoriesLoading
  const isError = tasksError || categoriesError
  const tasks = tasksResp?.rows ?? []
  const total = tasksResp?.total ?? 0

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-indigo-400">All Tasks</h1>
        <Link
          to="/tasks/new"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 active:bg-indigo-800"
        >
          Add Task
        </Link>
      </div>

      <div className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <div className="mt-1">
            <select
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:cursor-pointer"
              value={selectedCategoryId}
              onChange={e => {
                setSelectedCategoryId(e.target.value)
                setPage(1)
              }}
            >
              {categoryOptions.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <div className="mt-1">
            <select
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:cursor-pointer"
              value={priorityFilter}
              onChange={e => {
                setPriorityFilter(e.target.value)
                setPage(1)
              }}
            >
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <div className="mt-1">
            <select
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:cursor-pointer"
              value={completedFilter}
              onChange={e => {
                setCompletedFilter(e.target.value)
                setPage(1)
              }}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({length: 6}).map((_, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse h-56" />
          ))}
        </div>
      )}

      {isError && (
        <div className="mt-6 text-sm text-red-600">
          Failed to load tasks.{' '}
          <button className="underline" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && Array.isArray(tasks) && tasks.length === 0 && (
        <div className="mt-10 text-center text-gray-500">
          <p className="text-sm">No tasks found.</p>
        </div>
      )}

      {!isLoading && !isError && Array.isArray(tasks) && tasks.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tasks.map(task => (
            <Link to={`/tasks/${task.id}`} className="text-sm text-indigo-600 hover:text-blue-700 font-medium">
              <TaskCard
                key={task.id}
                task={task}
                categoryName={categories?.find?.(c => c.id === task.category_id)?.name}
                color={categories?.find?.(c => c.id === task.category_id)?.color}
              />
            </Link>
          ))}
        </div>
      )}

      {!isLoading && !isError && total > pageSize && (
        <PaginationBar page={page} pageSize={pageSize} total={total} onPageChange={setPage} />
      )}
    </div>
  )
}
