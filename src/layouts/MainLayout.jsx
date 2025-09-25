import Navbar from '../components/Navbar'
import {Outlet} from 'react-router-dom'
import {getCategories} from '../api/categories'
import {useQuery} from '@tanstack/react-query'

export default function MainLayout() {
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  return (
    <div>
      <Navbar />
      <main className='p-4 max-w-[1240px] mx-auto'>
        <Outlet context={{categories, categoriesLoading, categoriesError}} />
      </main>
    </div>
  )
}
