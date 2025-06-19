import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Calendar1Icon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
function Herosection() {

    const nav=useNavigate();
  return (
 <div className='flex flex-col items-start text-left justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen text-white'>
  
  <img src={assets.marvelLogo} className='max-h-11 lg:h-11 mt-20' />

  <h1 className='text-5xl md:text-[70px] md:leading-[80px] font-semibold'>
    Guardians <br /> of the Galaxy
  </h1>

  {/* ✅ هذا هو الجزء المعدل */}
  <div className='flex  items-start gap-2 text-gray-400 text-base'>
    <span>Action || Adventure || Sci-Fi</span>
    
    <div className='flex items-center gap-2'>
      <Calendar1Icon className='w-4 h-4' />
      <span>2018</span>
    </div>

    <div className='flex items-center gap-2'>
      <ClockIcon className='w-4 h-4' />
      <span>2h 8m</span>
    </div>
  </div>
   <p  className='w-[50%] text-gray-300'>Give our universal encrypt/decrypt tool a try! Encrypt or decrypt any string using various algorithm with just one mouse click. Popularity. AES (Advanced Encryption Standard) is the most popular</p>
   <button className='flex items-center gap-3 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer' onClick={()=>nav('/movie')}>Explore Movie
   <ArrowRight className='w-5 h-5'/>
   </button>
</div>

  )
}

export default Herosection