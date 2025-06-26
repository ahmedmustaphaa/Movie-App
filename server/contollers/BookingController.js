import { Show } from "../models/Show.js";
import { Booking } from "../models/Booking.js";
import Stripe from 'stripe';

 const checkSeatAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats;

    // تحقق: هل أي كرسي مختار محجوز؟
    const isAnySeatsTaken = selectedSeats.some(seat => seat in occupiedSeats);

    return !isAnySeatsTaken; // لو ولا واحد محجوز => متاح ✅

  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId } = await req.auth(); 
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    const isAvailable = await checkSeatAvailability(showId, selectedSeats);
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "الكراسي المحددة محجوزة بالفعل"
      });
    }

    const showData = await Show.findById(showId).populate("movie");
    const totalAmount = showData.showPrice * selectedSeats.length;

    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: totalAmount,
      bookedSeats: selectedSeats
    });

    selectedSeats.forEach(seat => {
      showData.occupiedSeats[seat] = userId;
    });

    showData.markModified("occupiedSeats");
    await showData.save();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16'
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/loading/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: showData.movie.title,
            },
            unit_amount: Math.floor(booking.amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        bookingId: booking._id.toString(),
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

    booking.paymentLink = session.url;
    await booking.save();

    return res.status(201).json({
      success: true,
      url: session.url,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params; // استخراج showId من الرابط

    const showData = await Show.findById(showId);
    if (!showData) {
      return res.status(404).json({ success: false, message: "العرض غير موجود" });
    }

    // رجّع الكراسي المحجوزة
    return res.status(200).json({
      success: true,
      occupiedSeats: showData.occupiedSeats
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
