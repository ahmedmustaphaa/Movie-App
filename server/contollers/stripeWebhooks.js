import Stripe from 'stripe';
import {Booking} from '../models/Booking.js';

export const stripeWebHooks = async (req, res) => {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // 1. التحقق من صحة Webhook من Stripe
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // 2. التعامل مع نوع الحدث إذا كان الدفع تم بنجاح
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;

      // 3. الحصول على session المرتبط بـ payment_intent
      const sessionList = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntent.id,
        limit: 1 // مهم: عشان ما يرجعلكش أكتر من واحدة
      });

      const session = sessionList.data[0];
      const { bookingId } = session.metadata;

      // 4. تحديث بيانات الحجز في قاعدة البيانات
      await Booking.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paymentLink: '' // ممكن تخزن هنا رابط الدفع لو عندك
      });

      console.log('✅ PaymentIntent succeeded and booking updated!', bookingId);
    }

    // 5. إرسال استجابة ناجحة لـ Stripe
    res.status(200).send('✅ Webhook received!');
  } catch (error) {
    console.error('❌ Webhook Error:', error.message);
    res.status(400).send(`❌ Webhook Error: ${error.message}`);
  }
};
