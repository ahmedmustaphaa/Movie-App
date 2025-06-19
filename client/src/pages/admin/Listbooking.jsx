import React, { useEffect, useState } from 'react';
import { dummyBookingData } from '../../assets/assets';
import Title from './Title';

import { dateFormat } from '../../lib/DateFormat'; // تأكد من أن هذه الدالة موجودة

function Listbooking() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  if (isLoading) {
    return <div className="p-5 text-center text-lg">Loading...</div>;
  }

  return (
    <div className="p-5">
      <Title text1="List" text2="Bookings" />

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full rounded-lg overflow-hidden shadow border border-primary/20 bg-primary/20">
          <thead className="text-left text-sm font-semibold text-gray-700 bg-primary/10 border-b border-primary/20">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Movie</th>
              <th className="px-4 py-3">Date & Time</th>
              <th className="px-4 py-3">Seats</th>
              <th className="px-4 py-3">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-gray-800">
            {bookings.map((item, index) => (
              <tr key={index} className="border-b border-primary/20 even:bg-primary/10">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.user.name}</td>
                <td className="p-2">{item.show.movie.title}</td>
                <td className="p-2">{dateFormat(item.show.showDateTime)}</td>
                <td className="p-2">
                  {Object.keys(item.bookedSeats)
                    .map((seat) => item.bookedSeats[seat])
                    .join(', ')}
                </td>
                <td className="p-2"> {item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Listbooking;
