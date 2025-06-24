import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { assets } from '../assets/assets';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import isoTimeFormating from '../lib/isoTimeFormating';
import Bluecircule from '../components/Bluecircule';
import toast from 'react-hot-toast';
import { ShareContext } from '../../context/Appcontext';

function SeatLayout() {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [show, setShow] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  const { axios, image_base_url, getToken } = ShareContext();
  const { id, date } = useParams();
  const nav = useNavigate();

  const GroupRows = [['A', 'B'], ['C', 'D'], ['E', 'F'], ['G', 'H'], ['I', 'J']];

  // جلب بيانات العرض
  useEffect(() => {
    const getShow = async () => {
      try {
        const { data } = await axios.get(`/api/show/${id}`);
        setShow(data);
        console.log(data);
      } catch (error) {
        toast.error('فشل في تحميل بيانات العرض');
        console.error(error);
      }
    };
    getShow();
  }, [id]);

  // حجز التذكرة
  const BookTicket = async () => {
    const token = await getToken();

    try {
      if (!selectedTime || !selectedSeats.length) {
        return toast.error('الرجاء اختيار الوقت والمقاعد أولاً');
      }

      const { data } = await axios.post(
        '/api/booking/create',
        {
          showId: selectedTime.showId,
          selectedSeats,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
       window.location.href=data.url

      } else {
        toast.error(data.message || 'حدث خطأ أثناء الحجز');
      }
    } catch (error) {
      console.error(error);
      toast.error('حدث خطأ أثناء تنفيذ الحجز');
    }
  };

  // المقاعد المحجوزة
  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(`/api/booking/seats/${selectedTime.showId}`);
      setOccupiedSeats(data.occupiedSeats);
    } catch (error) {
      toast.error('حدث خطأ أثناء جلب المقاعد المحجوزة');
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedTime) {
      getOccupiedSeats();
    }
  }, [selectedTime]);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error('الرجاء اختيار وقت أولاً');
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
          const isOccupied = occupiedSeats.includes(seatId);
          const isSelected = selectedSeats.includes(seatId);

          return (
            <button
              key={seatId}
              onClick={() => !isOccupied && handleSeatClick(seatId)}
              disabled={isOccupied}
              className={`h-8 w-8 rounded border border-primary/60 transition duration-200 
                ${isOccupied
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : isSelected
                  ? 'bg-primary text-white'
                  : 'bg-white text-black'}`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-[120px]">
      {/* الشريط الجانبي للأوقات المتاحة */}
      <div className="w-full md:w-60 bg-primary/10 border border-primary/20 rounded-lg py-8 h-max md:sticky md:top-28 text-white">
        <p className="text-lg font-semibold px-6 mb-4">🎞 الأوقات المتاحة</p>

        <div className="flex flex-col gap-2">
          {show.dateTime[date]?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 w-full rounded-r-md cursor-pointer transition 
                ${selectedTime?.time === item.time
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary/10'}`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormating(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* قسم المقاعد */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16 text-white">
        <Bluecircule top="-100px" left="-100px" />
        <Bluecircule bottom="0px" right="0px" />

        <h1 className="text-2xl font-bold mb-2">🎟️ اختر مقاعدك</h1>

        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">جهة الشاشة</p>

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
            ✅ المقاعد المختارة: {selectedSeats.join(', ')}
          </div>
        )}

        <button
          onClick={BookTicket}
          className="mt-8 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition flex items-center gap-2"
        >
          متابعة إلى الدفع <ArrowRightIcon />
        </button>
      </div>
    </div>
  ) : (
    <div className="text-center text-white py-40">...جاري التحميل</div>
  );
}

export default SeatLayout;
