import React, { useEffect, useState } from 'react';
import { ShareContext } from '../../context/Appcontext';
import Bluecircule from '../components/Bluecircule';
import { dateFormat } from '../lib/DateFormat';
import isoTimeFormating from '../lib/isoTimeFormating';
import { Link } from 'react-router';

function Mybooking() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { axios, image_base_url, getToken } = ShareContext();

  // جلب الحجوزات
  const getMyBooking = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('api/user/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);
      setBookings(data.bookings || []); // حماية إضافية
    } catch (error) {
      console.error('خطأ أثناء تحميل الحجوزات:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyBooking();
  }, []);

  return !isLoading ? (
    <div className="relative md:flex-row px-6 md:px-16 lg:px-40 py-[120px]">
      <Bluecircule top="100px" left="100px" />
      <div>
        <Bluecircule bottom="0px" left="600px" />
      </div>

      <h1 className="text-lg font-semibold mb-4 text-white">🎟️ My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-400">لا توجد حجوزات حتى الآن.</p>
      ) : (
        bookings.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between bg-primary/10 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl text-white"
          >
            {/* القسم الأيسر: صورة ومعلومات الفيلم */}
            <div className="flex flex-col md:flex-row">
              <img
                src={image_base_url + item?.show?.movie?.poster_path}
                alt="poster"
                className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded"
              />
              <div className="flex flex-col p-4">
                <p className="text-lg font-semibold">{item?.show?.movie?.title || 'No title'}</p>
                <p className="text-gray-400 text-lg font-semibold">{item?.show?.movie?.runtime || 0} min</p>
                <p className="text-gray-400 text-lg font-semibold">
                  {item?.show?.showDateTime ? dateFormat(item.show.showDateTime) : 'تاريخ غير متوفر'}
                </p>
              </div>
            </div>

            {/* القسم الأيمن: السعر والمقاعد */}
            <div className="flex flex-col md:items-end md:text-right justify-between p-4">
              <div className="flex items-center gap-4">
                <p className="text-2xl font-semibold">$ {item.amount || 0}</p>
                {!item.isPaid && (
                  <Link to={item.paymentLink} className="my-[60px] m-auto px-6 py-2 rounded-lg text-sm bg-primary hover:bg-primary-dull transition font-medium cursor-pointer">
                    Pay Now
                  </Link>
                )}
              </div>
              <div className="text-sm">
                <p>
                  <span className="text-gray-400">Total Tickets:</span>{' '}
                  {item.bookedSeats?.length || 4}
                </p>
                <p>
                  <span className="text-gray-400">Seat Numbers:</span>{' '}
                  {item.bookedSeats?.join(', ') || 'Az bc '}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  ) : (
    <div className="relative md:flex-row px-6 md:px-16 lg:px-40 py-[120px] text-white">Loading...</div>
  );
}

export default Mybooking;
