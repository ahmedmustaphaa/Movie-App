import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import isoTimeFormating from '../lib/isoTimeFormating';
import Bluecircule from '../components/Bluecircule';
import toast from 'react-hot-toast';

function SeatLayout() {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]); // ✅ لازم دي
  const [show, setShow] = useState(null);

  const { id, date } = useParams();
  const nav = useNavigate();

  const GroupRows = [['A', 'B'], ['C', 'D'], ['E', 'F'], ['G', 'H'], ['I', 'J']];

  const getShow = async () => {
    const foundShow = dummyShowsData.find((dummy) => dummy._id === id);
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error('Please select a time first');
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer transition duration-200
                ${
                  selectedSeats.includes(seatId)
                    ? 'bg-primary text-white'
                    : 'bg-white text-black'
                }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  useEffect(() => {
    getShow();
  }, []);

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-[120px]">
      {/* Available Timings Sidebar */}
      <div className="w-full md:w-60 bg-primary/10 border border-primary/20 rounded-lg py-8 h-max md:sticky md:top-28 text-white">
        <p className="text-lg font-semibold px-6 mb-4">🎞 Available Timings</p>

        <div className="flex flex-col gap-2">
          {show.dateTime[date]?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 w-full rounded-r-md cursor-pointer transition 
                ${
                  selectedTime?.time === item.time
                    ? 'bg-primary text-white'
                    : 'hover:bg-primary/10'
                }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormating(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section (Seats Layout) */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16 text-white">
        <Bluecircule top="-100px" left="-100px" />
        <Bluecircule bottom="0px" right="0px" />

        <h1 className="text-2xl font-bold mb-2">🎟️ Select Your Seats</h1>

        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {GroupRows.map((group, idx) => (
              <div key={idx} className="flex gap-10">
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        {selectedSeats.length > 0 && (
          <div className="mt-6 bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm">
            ✅ Selected Seats: {selectedSeats.join(', ')}
          </div>
        )}

        <button onClick={()=>nav('/my-bookings')} className="mt-8 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition flex items-center gap-2" >proccesed to checkOut <ArrowRightIcon/></button>
      </div>
    </div>
  ) : (
    <div className="text-center text-white py-40">Loading...</div>
  );
}

export default SeatLayout;
