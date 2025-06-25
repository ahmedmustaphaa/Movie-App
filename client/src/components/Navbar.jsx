import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { Menu, X } from 'lucide-react';
import { useUser, useClerk, UserButton } from '@clerk/clerk-react';
import { ShareContext } from '../../context/Appcontext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const { favourite } = ShareContext();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
   <div className='flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30'>
  <Link to='/'>
    <h1 className='text-3xl font-extrabold bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 text-transparent bg-clip-text drop-shadow-lg tracking-wide animate-pulse'>
      AhmedFlix 🎬
    </h1>
  </Link>
</div>


        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-white font-medium">
          <Link className="hover:text-yellow-400 transition" to="/">Home</Link>
          <Link className="hover:text-yellow-400 transition" to="/movies">Movies</Link>
          <Link className="hover:text-yellow-400 transition" to="/">Theaters</Link>
          <Link className="hover:text-yellow-400 transition" to="/">Release</Link>
          {favourite.length > 0 && (
            <Link className="hover:text-yellow-400 transition" to="/favorite">Favorite</Link>
          )}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {!user ? (
            <button
              onClick={openSignIn}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-5 rounded-full transition"
            >
              Login
            </button>
          ) : (
            <UserButton />
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start px-6 pt-4 pb-8 bg-[#0f172a] animate-slide-down origin-top shadow-xl rounded-b-2xl">
          <Link onClick={()=>setIsOpen(false)}  className="text-white py-2 w-full hover:text-yellow-400 transition" to="/">Home</Link>
          <Link onClick={()=>setIsOpen(false)} className="text-white py-2 w-full hover:text-yellow-400 transition" to="/movies">Movies</Link>
          <Link onClick={()=>setIsOpen(false)} className="text-white py-2 w-full hover:text-yellow-400 transition" to="/">Theaters</Link>
          <Link onClick={()=>setIsOpen(false)} className="text-white py-2 w-full hover:text-yellow-400 transition" to="/">Release</Link>
          {favourite.length > 0 && (
            <Link className="text-white py-2 w-full hover:text-yellow-400 transition" to="/favorite">Favorite</Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
