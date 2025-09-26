import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'

export default function Navbar() {
  const [nav, setNav] = useState(true)

  const handleNav = () => {
    setNav(prev => !prev)
  }

  const links = [
    {label: 'All Tasks', to: '/'},
    {label: 'Create Task', to: '/tasks/new'},
  ]

  const desktopItemClass = 'cursor-pointer p-3 hover:text-indigo-400 transition-all ease-in-out'

  return (
    <nav className='text-indigo-400 flex justify-between items-center max-w-[1400px] mx-auto p-4'>
      <h1 className='text-3xl font-bold text-indigo-800'>Tasks Manager</h1>
      <ul className='hidden md:flex'>
        {links.map(({label, to}) => (
          <li key={label}>
            <NavLink to={to} className={({isActive}) => `${desktopItemClass} ${isActive ? 'text-indigo-800' : ''}`}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className='md:hidden' onClick={handleNav}>
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div
        className={
          !nav
            ? 'z-100 fixed left-0 top-0 w-[60%] h-full bg-indigo-950 ease-in-out duration-300'
            : 'z-100 fixed left-[-100%] top-0 w-[60%] h-full ease-in-out duration-300'
        }>
        <h1 className='w-full text-2xl font-bold text-indigo-400 mx-4 mt-7'>Tasks Manager</h1>
        <ul className='uppercase p-4 text-indigo-300'>
          {links.map(({label, to}, index) => {
            const isLast = index === links.length - 1
            return (
              <li key={label} className={`cursor-pointer p-4 ${!isLast ? 'border-b border-indigo-600' : ''}`}>
                <NavLink
                  to={to}
                  className={({isActive}) => (isActive ? 'text-white' : '')}
                  onClick={() => setNav(true)}>
                  {label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
