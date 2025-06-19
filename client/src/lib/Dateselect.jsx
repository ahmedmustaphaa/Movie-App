import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Bluecircule from '../components/Bluecircule';
import { useNavigate } from 'react-router';

function Dateselect({ datetime = {}, id }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const dateKeys = Object.keys(datetime);
  const navigate=useNavigate();
const handleBookClick = () => {
  if (!selectedDate) {
    toast.error('Please select a date before booking!');
  } else {
    toast.success(`Booked for ${new Date(selectedDate).toDateString()}`);
    navigate(`/movies/${id}/${selectedDate}`);
  }
};


  return (
    <section className="pt-32 relative px-4">


      <div className="relative z-10 p-6 bg-primary/10 border border-primary/20 rounded-lg max-w-4xl mx-auto">
         <Bluecircule top='-100px' left='-100px' />
      <Bluecircule bottom='0px' right='0px' />
        <p className="text-xl font-semibold text-white mb-4">🎟 Choose Date</p>

        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
          <ChevronLeftIcon className="text-white cursor-pointer" />
          <div className="flex gap-4">
            {dateKeys.map((date, idx) => {
              const day = new Date(date).getDate();
              const month = new Date(date).toLocaleDateString('en-US', { month: 'short' });

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDate(date);
                    toast(`Selected ${new Date(date).toDateString()}`);
                  }}
                  className={`flex flex-col items-center justify-center w-16 h-16 rounded-md transition
                    ${selectedDate === date
                      ? 'bg-amber-600 text-white scale-105'
                      : 'bg-gray-800 text-gray-300 hover:bg-amber-600 hover:text-white'}`}
                >
                  <span className="text-lg font-bold">{day}</span>
                  <span className="text-sm uppercase">{month}</span>
                </button>
              );
            })}
          </div>
          <ChevronRightIcon className="text-white cursor-pointer" />
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleBookClick}
            className="bg-amber-600 hover:bg-amber-700 px-6 py-2 text-white rounded-full transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Dateselect;
