import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets';
import Bluecircule from '../components/Bluecircule';
import { Images } from 'lucide-react';
import isoTimeFormating from '../lib/isoTimeFormating';
import { dateFormat } from '../lib/DateFormat';
function Mybooking() {
  const [bookings,setBookings]=useState([]);

  const [isLoading,setIsLoading]=useState(false);


 const getMyBooking=()=>{
    setBookings(dummyBookingData)
  }
  useEffect(()=>{
getMyBooking()
  })
  return !isLoading?(
    <div className='relative md:flex-row px-6 md:px-16 lg:px-40 py-[120px]'>

    <Bluecircule top='100px' left='100px'></Bluecircule>
    <div>
       <Bluecircule bottom='0px' left='600px'></Bluecircule>
    </div>
       
    <h1 className='tex-lg font-semibold mb-4'>My Bookings</h1>
    {bookings.map((item)=>{
      return <div className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>
      <div className='flex flex-col md:flex-row'>
      <img src={item.show.movie.poster_path} className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'></img>
      <div className='flex flex-col p-4'>
<p className='text-lg font-semibold'>{item.show.movie.title}</p>
<p className='text-gray-400 text-lg font-semibold'>{item.show.movie.runtime}</p>
<p className='text-gray-400  text-lg font-semibold '>{dateFormat(item.show.showDateTime)}</p>
      </div>
      </div>

      <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
      <div className='flex items-center gap-4 '>
      <p className='text-2xl font-semibold '>$ {item.amount}</p>
      {!item.ispaid && <button className=' my-[60px] m-auto px-6 py-2 rounded-lg text-sm bg-primary hover:bg-primary-dull transition  font-medium cursor-pointer'>pay now</button>}
      </div>
      <div className='text-sm'>
      <p><span className='text-gray-400'>Total Tickets :</span> {item.bookedSeats.length} </p>
      <p><span className='text-gray-400'>Seat Number :</span> {item.bookedSeats.join(", ")} </p>
    
      </div>
      </div>
      </div>
    })}
    </div>
  ):(
    <div className='relative md:flex-row px-6 md:px-16 lg:px-40 py-[120px]'> Loading.....</div>
  )
}

export default Mybooking