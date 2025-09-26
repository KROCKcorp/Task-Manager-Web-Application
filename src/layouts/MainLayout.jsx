import Navbar from '../components/Navbar'
import {Outlet} from 'react-router-dom'
import {getCategories} from '../api/categories'
import {useQuery} from '@tanstack/react-query'
import {Toaster} from 'react-hot-toast'

export default function MainLayout() {
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  return (
    <div>
      <Toaster />
      <Navbar />
      <main className="p-4 max-w-[1240px] mx-auto">
        <Outlet context={{categories, categoriesLoading, isCategoriesError, categoriesError}} />
      </main>
    </div>
  )
}
