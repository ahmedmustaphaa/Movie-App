import React from 'react';
import { assets } from '../../assets/assets';


import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

function AdminSidebar() {
  const user = {
    firstname: 'ahmed ',
    lastname: 'mustafa',
    imageUrl: '/ad.jpg'
  };

  const adminNavLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
    { name: 'Add shows', path: '/admin/add-shows', icon: PlusSquareIcon },
    { name: 'List shows', path: '/admin/list-shows', icon: ListIcon },
    { name: 'List bookings', path: '/admin/list-bookings', icon: ListCollapseIcon }
  ];

  return (
    <aside className="h-[calc(100vh-64px)] w-[100px] md:w-[250px] border-r border-gray-300/20 text-sm shadow-xl flex flex-col items-center pt-8 px-4 transition-all duration-300">
      
      {/* Profile */}
      <div className="flex flex-col items-center">
        <img src={user.imageUrl} className="h-16 w-16 rounded-full shadow-md border-2 border-yellow-400" alt="Admin" />
      <p
  className="mt-3 text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-transparent bg-clip-text drop-shadow-lg animate-fade-in hidden md:block"
>
  {user.firstname} {user.lastname}
</p>

      </div>

      {/* Navigation Links */}
      <nav className="mt-10 w-full flex flex-col gap-2 px-2">
        {adminNavLinks.map(({ name, path, icon: Icon }) => (
          <NavLink
            to={path}
            end
            key={name}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-300 
              ${
                isActive
                  ? 'bg-yellow-400 text-black shadow-md'
                  : 'text-slate-300 hover:bg-white/10 hover:scale-[1.02]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="w-5 h-5 group-hover:scale-110 transition duration-300" />
                <span className="hidden md:inline-block">{name}</span>

                {/* Indicator */}
                <span
                  className={`absolute left-0 top-0 h-full w-[4px] rounded-r bg-yellow-400 transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
