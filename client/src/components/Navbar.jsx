import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import { Menu, SearchIcon, TicketPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth, useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { ShareContext } from '../../context/Appcontext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const {user}=useUser();
  
    const {favourite}=ShareContext()

  const {openSignIn}=useClerk();
  const nav=useNavigate();

  return (
    <div className='fixed w-full top-0 left-0 z-50'>
      <div className='w-[84%] m-auto py-4 flex items-center justify-between'>
        <Link to='/'>
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        <div className='hidden md:flex gap-8 bg-[#15263A] px-6 py-4 rounded-full'>
          <Link to='/' className='text-white hover:text-amber-600 transition'>Home</Link>
          <Link to='/movies' className='text-white hover:text-amber-600 transition'>Movies</Link>
          <Link to='/' className='text-white hover:text-amber-600 transition'>Theaters</Link>
          <Link to='/' className='text-white hover:text-amber-600 transition'>Release</Link>
          <Link to='/favorite' className='text-white hover:text-amber-600 transition'>Favorite</Link>
        </div>

        <div className='flex items-center gap-6'>
          <SearchIcon className='text-white' />
 {!user ?(
            <button className='bg-primary hover:bg-primary-dull font-medium transition px-6 py-2 rounded-full' onClick={openSignIn}>Login</button>
 ):(
  <UserButton>
  <UserButton.MenuItems>
  
  </UserButton.MenuItems>
  </UserButton>
 )}
          <Menu className='md:hidden cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className='md:hidden flex flex-col items-start bg-[#15263A] py-4 transition-transform transform translate-x-0 animate-slide-in'>
          <Link to='/' className='text-white py-2 hover:text-amber-600 transition'>Home</Link>
          <Link to='/movies' className='text-white py-2 hover:text-amber-600 transition'>Movies</Link>
          <Link to='/' className='text-white py-2 hover:text-amber-600 transition'>Theaters</Link>
          <Link to='/' className='text-white py-2 hover:text-amber-600 transition'>Release</Link>
      {favourite.length > 0 && <Link to='/favorite' className='text-white py-2 hover:text-amber-600 transition'>Favorite</Link>}
        </div>
      )}
    </div>
  );
}

export default Navbar;