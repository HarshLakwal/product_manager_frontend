import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.clear()
    navigate("/")
  }
  return (
    <>
      <header class="flex items-center h-20 px-6 sm:px-10 bg-white">
        Mini Loan
        <div class="flex flex-shrink-0 items-center ml-auto">
          <div class="border-l pl-3 ml-3 space-x-1">
            <button onClick={()=> handleLogout()} class="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
              <span class="sr-only">Log out</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar