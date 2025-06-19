import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'; // make sure this path is valid

function Footer() {
  return (
    <footer className="bg-[#0B0B0B] text-white py-10 px-6 md:px-20">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo & Description */}
        <div>
          <img src={logo} alt="CineVerse Logo" className="h-10 mb-4" />
          <p className="text-sm text-gray-400">
            CineVerse – your gateway to the best of cinema. Discover, watch, and book your favorite movies.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-amber-500">Home</Link></li>
            <li><Link to="/movies" className="hover:text-amber-500">Now Showing</Link></li>
            <li><Link to="/theaters" className="hover:text-amber-500">Theaters</Link></li>
            <li><Link to="/favorite" className="hover:text-amber-500">Favorites</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@cineverse.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> 42 Movie Lane, Film City
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-gray-300">
            <a href="#"><Facebook className="hover:text-blue-500" /></a>
            <a href="#"><Twitter className="hover:text-sky-400" /></a>
            <a href="#"><Instagram className="hover:text-pink-500" /></a>
            <a href="#"><Youtube className="hover:text-red-600" /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-12 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} CineVerse. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
