import { useState } from 'react'

import './App.css'
import { Route, Routes, useLocation } from 'react-router'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import SeatLayout from './pages/SeatLayout'
import Moviedetails from './pages/Moviedetails'
import Mybooking from './pages/Mybooking'
import Favorite from './pages/favorite'
import Footer from './components/Footer'

import {Toaster} from 'react-hot-toast'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import Addshow from './pages/admin/Addshow'
import Listbooking from './pages/admin/Listbooking'
import Listshows from './pages/admin/Listshows'
function App() {


  const isAdminRoute=useLocation().pathname.startsWith('/admin')


  return  (
  <div>

  <Toaster/>

     {!isAdminRoute &&  <Navbar/>}
  <Routes>
  <Route path='/' element={<Home/>}></Route>
  <Route path='/movies' element={<Movies/>}></Route>
  <Route path='/movies/:id' element={<Moviedetails/>}></Route>
  <Route path='/my-bookings' element={<Mybooking/>}></Route>
  <Route path='/favorite' element={<Favorite/>}></Route>
  <Route path='/movies/:id/:date' element={<SeatLayout/>}></Route>
  <Route path='/admin/*' element={<Layout/>}>
  <Route index element={<Dashboard/>} />
  <Route path='add-shows' element={<Addshow/>} />
  <Route path='list-shows' element={<Listshows/>} />
  <Route path='list-bookings' element={<Listbooking/>} />
  
  </Route>
  </Routes>
  {!isAdminRoute && <Footer/>}
  </div>
  )
}

export default App
