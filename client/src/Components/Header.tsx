import React from 'react'
import { GiRainbowStar } from 'react-icons/gi'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'


function Header() {

  const {logout, isAuthenticated} = useAuth0()
  return (
<header className="text-white body-font w-full h-30 rounded drop-shadow-lg bg-black">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <div className="flex title-font font-medium items-center text-black mb-4 md:mb-0">
     <Link to="/" className='flex flex-row items-center'> <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-20 h-20 text-black p-1 bg-[#cc2936] rounded-full" viewBox="0 -2 13 19">
            <GiRainbowStar />
          </svg>
      <span className="text-white text-xl font-bold rounded  mx-6 py-2 px-2  hover:bg-white hover:text-black cursor-pointer transition duration-200 ease-in-out">GP-TA</span></Link>
    </div>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
     <Link to="/about" className="text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-black transition duration-200 ease-in-out" data-testid={'About-Header'}>About</Link>
      <Link to="/pricing" className="text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-black transition duration-200 ease-in-out mr-5"  data-testid={'Price-Header'}>Pricing</Link>

    </nav>
        {isAuthenticated ? <button onClick={() => logout() } className="inline-flex items-center bg-[#cc2936] text-white border-0 py-1 px-3 font-bold focus:outline-none hover:bg-red-700 hover:text-white rounded text-base mt-4 md:mt-0">Log out
      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button> : null}
      </div>



</header>  )
}

export default Header