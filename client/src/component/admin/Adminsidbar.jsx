import React, { useState } from 'react';
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
    firstname: 'Admin',
    lastname: 'User',
    imageUrl: assets.profile
  };

  const adminNavLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
    { name: 'Add shows', path: '/admin/add-shows', icon: PlusSquareIcon },
    { name: 'List shows', path: '/admin/list-shows', icon: ListIcon },
    { name: 'List bookings', path: '/admin/list-bookings', icon: ListCollapseIcon }
  ];

  return (
    <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm">
      
      <img src={user.imageUrl} className="h-9 w-9 md:h-14 md:w-14 rounded-full mx-auto" alt="Profile" />
      <p className="mt-2 text-base max-md:hidden">{user.firstname} {user.lastname}</p>

      <div className="w-full">
        {adminNavLinks.map((navItem) => {
          const Icon = navItem.icon;
          return (
            <NavLink end
              to={navItem.path}
              key={navItem.name}
              className={({ isActive }) =>
                `relative flex items-center max-md:justify-center gap-2 
                 w-full py-2.5 md:pl-10
                 first:mt-10 text-gray-400
                 ${isActive ? 'bg-primary/15 text-primary group' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5" />
                  <p className="max-md:hidden">{navItem.name}</p>
                  <span
                    className={`w-1.5 h-10 rounded-l right-0 absolute ${
                      isActive ? 'bg-primary' : ''
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default AdminSidebar;
