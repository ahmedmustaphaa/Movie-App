import React, { useEffect, useState } from 'react';
import Title from './Title';
import { CheckIcon, StarIcon } from 'lucide-react'; // تأكد أنك مثبت lucide-react
import { dummyShowsData } from '../../assets/assets';
import { kconverter } from '../../lib/KConverter';


function Addshow() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
   const [selectedMovie,setSelectedMovie]=useState(null);
   const [dataTimeSelection,setDataTimeSelection]=useState({});
   const [dateTimeInput,setDateTimeInput]=useState("");

   const [showPrice,setShowPrice]=useState("")

 const handleDateTimeAdd = () => {
  if (!dateTimeInput) return;

  const [date, time] = dateTimeInput.split("T");
  if (!date || !time) return;

  setDateTimeSelection((prev) => {
    const times = prev[date] || [];

    if (!times.includes(time)) {
      return {
        ...prev,
        [date]: [...times, time],
      };
    }

    return prev;
  });
};
const handleRemoveTime = (date, time) => {
  setDateTimeSelection((prev) => {
    const filteredTimes = prev[date].filter((t) => t !== time);

    if (filteredTimes.length === 0) {
      const { [date]: _, ...rest } = prev;
      return rest;
    }

    return {
      ...prev,
      [date]: filteredTimes,
    };
  });
};

  useEffect(() => {
    // جلب أفلام تجريبية عند تحميل المكون
    setNowPlayingMovies(dummyShowsData);
  }, []);

  return (
    <div className="p-5">
      <Title text1="Add" text2="Shows" />
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>

      {nowPlayingMovies.length > 0 ? (
        <div className="overflow-x-auto pb-4">
          <div className="group flex flex-wrap gap-4 mt-4 w-max">
            {nowPlayingMovies.map((movie) => (
              <div
                key={movie.id} onClick={()=>setSelectedMovie(movie._id)}
                className="relative max-w-40 cursor-pointer group-hover:opacity-90 hover:-translate-y-1 transition duration-300"
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="w-full object-cover brightness-90"
                  />
                  <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                    <p className="flex items-center gap-1 text-gray-400">
                      <StarIcon className="w-4 h-4 text-primary fill-primary" />
                      {movie.vote_average.toFixed(1)}
                    </p>
                    <p className="text-gray-300">{ kconverter(movie.vote_count)  } Votes</p>
                  </div>
                </div>
                {selectedMovie ===movie._id && (
                  <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded'>
                  <CheckIcon className='w-4 h-4 text-white'  strokeWidth={2.5}></CheckIcon>
                   </div>
                )}

                <p className='font-medium truncate'>{movie.title}</p>
                <p className='text-gray-400 text-sm'>{movie.release_date}</p>
              </div>
            ))}
          </div>
          {/* Show Price Input */}
<div className="mt-8">
  <label className="block text-sm font-medium mb-2">Show Price</label>
  
  <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">

    
    <input
      min={0}
      type="number"
      value={showPrice}
      onChange={(e) => setShowPrice(e.target.value)}
      placeholder="Enter show price"
      className="outline-none text-sm"
    />
  </div>
</div>

        </div>
      ) : (
        <p className="mt-4 text-gray-500">No movies available.</p>
      )}
{/* Date & Time Selection */}
<div className="mt-6">
  <label className="block text-sm font-medium mb-2">Select Date and Time</label>

  <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
    <input
      type="datetime-local"
      value={dateTimeInput}
      onChange={(e) => setDateTimeInput(e.target.value)}
      className="outline-none rounded-md"
    />

    <button
      onClick={handleDateTimeAdd}
      className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer"
    >
      Add Time
    </button>
  </div>
</div>
{/* Display Selected Dates & Times */}
{Object.keys(dateTimeSelection).length > 0 && (
  <div className="mt-6">
    <h3 className="text-sm font-medium mb-2">Selected Times</h3>
    <div className="flex flex-col gap-4">
      {Object.entries(dateTimeSelection).map(([date, times]) => (
        <div key={date}>
          <p className="font-medium text-gray-700 mb-1">{date}</p>
          <div className="flex flex-wrap gap-2">
            {times.map((time) => (
              <div
                key={time}
                className="flex items-center gap-2 bg-primary/10 text-sm text-gray-800 px-3 py-1 rounded-full"
              >
                <span>{time}</span>
                <button
                  onClick={() => handleRemoveTime(date, time)}
                  className="text-red-600 hover:text-red-800 font-bold"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)}


    </div>
  );
}

export default Addshow;
