import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { CheckCircle, ShoppingBag, ArrowLeft, ArrowRight, Gift, Sparkles, Heart, Truck } from 'lucide-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { ShippingForm } from '../../features/checkout/components/ShippingForm';
import { PaymentForm } from '../../features/checkout/components/PaymentForm';
import { useCheckoutLogic } from '../../features/checkout/hooks/useCheckoutLogic';

const CheckoutSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .required('Full Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone must be exactly 10 digits')
    .required('Phone number is required'),
  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .required('Address is required'),
  city: Yup.string()
    .min(2, 'City name is too short')
    .required('City is required'),
  zipCode: Yup.string()
    .matches(/^[0-9]{5,6}$/, 'Enter a valid 5 or 6 digit zip code')
    .required('Zip Code is required'),
  state: Yup.string()
    .required('State is required')
});

const Checkout = () => {
  const {
    cart,
    subtotal,
    shipping,
    total,
    isSuccess,
    confirmedOrderId,
    handleCheckoutSubmit
  } = useCheckoutLogic();

  /* ── Thank You / Order Confirmed Screen ── */
  if (isSuccess) {
    return (
      <div className="bg-neutral-50 dark:bg-black min-h-screen flex items-center justify-center font-sans px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center p-12 max-w-xl w-full bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 shadow-2xl rounded-[3rem] relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#f8c8dc]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#f8c8dc]/10 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="relative z-10"
          >
            <div className="relative inline-block mb-6">
              <CheckCircle size={90} className="text-[#f8c8dc] mx-auto" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 border border-dashed border-[#f8c8dc]/30 rounded-full"
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="relative z-10">
            <h2 className="text-5xl font-serif text-black dark:text-white mb-3">Thank You!</h2>
            <p className="text-[#f8c8dc] text-sm uppercase tracking-[0.3em] font-bold mb-8">Your order has been placed successfully</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="relative z-10">
            <div className="bg-neutral-50 dark:bg-black/50 p-6 rounded-3xl mb-4 border border-black/5 dark:border-white/5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2 font-bold">Order Tracking ID</p>
              <p className="text-2xl font-mono tracking-[0.4em] text-black dark:text-white">{confirmedOrderId}</p>
            </div>
            <div className="bg-neutral-50 dark:bg-black/50 p-6 rounded-3xl mb-4 border border-black/5 dark:border-white/5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2 font-bold">Order Date</p>
              <p className="text-lg text-black dark:text-white font-medium">
                {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="bg-[#f8c8dc]/10 p-6 rounded-3xl mb-8 border border-[#f8c8dc]/20">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#f8c8dc] mb-2 font-bold">Estimated Delivery</p>
              <p className="text-lg text-black dark:text-white font-medium">
                {(() => { const d = new Date(); d.setDate(d.getDate() + 5); return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); })()}
                {' — '}
                {(() => { const d = new Date(); d.setDate(d.getDate() + 7); return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); })()}
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="relative z-10">
            {/* Perks row */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="flex flex-col items-center gap-2 p-4 bg-neutral-50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                <Gift size={20} className="text-[#f8c8dc]" />
                <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-500">Gift Wrapped</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-neutral-50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                <Truck size={20} className="text-[#f8c8dc]" />
                <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-500">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-neutral-50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                <Heart size={20} className="text-[#f8c8dc]" />
                <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-500">With Love</span>
              </div>
            </div>

            <p className="text-neutral-500 font-light mb-10 text-sm leading-relaxed max-w-sm mx-auto">
              Your luxury experience with <span className="font-semibold text-black dark:text-white">Velvora</span> has begun.
              A confirmation email will be sent shortly with your order details.
            </p>

            <div className="flex flex-col gap-4">
              <Link
                to={`/track/${confirmedOrderId}`}
                className="inline-flex items-center justify-center gap-3 bg-black dark:bg-[#f8c8dc] text-white dark:text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-lg hover:-translate-y-1"
              >
                Track My Order <ArrowRight size={16} />
              </Link>
              <div className="flex justify-center gap-6 mt-2">
                <Link
                  to="/"
                  className="text-neutral-400 hover:text-black dark:hover:text-white text-[10px] uppercase tracking-widest transition-colors font-bold"
                >
                  Return Home
                </Link>
                <Link
                  to="/shop"
                  className="text-neutral-400 hover:text-black dark:hover:text-white text-[10px] uppercase tracking-widest transition-colors font-bold"
                >
                  Go to Shop
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const cartItems = cart?.items || [];

  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen text-neutral-800 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-12 pt-32">
        <Link to="/user/cart" className="inline-flex items-center gap-2 text-neutral-400 hover:text-black dark:hover:text-white text-xs uppercase tracking-widest font-bold mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Bag
        </Link>
        <h1 className="text-5xl font-serif text-black dark:text-white mb-12">Secure Checkout</h1>

        {/* Order Items Summary */}
        {cartItems.length > 0 && (
          <div className="bg-white dark:bg-[#111] rounded-3xl border border-black/5 dark:border-white/10 shadow-sm p-8 mb-12">
            <h3 className="text-sm uppercase tracking-widest text-neutral-400 font-bold mb-6 flex items-center gap-3">
              <ShoppingBag size={16} className="text-[#f8c8dc]" /> Your Items ({cartItems.length})
            </h3>
            <div className="space-y-4">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 py-4 border-b border-black/5 dark:border-white/5 last:border-0">
                  <div className="w-16 h-16 bg-neutral-50 dark:bg-black rounded-xl overflow-hidden shrink-0 border border-black/5 dark:border-white/10">
                    <img src={item.productId?.image} alt={item.productId?.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-black dark:text-white font-serif text-lg truncate">{item.productId?.name}</p>
                    <p className="text-neutral-400 text-xs uppercase tracking-widest">{item.productId?.brand} · Qty: {item.quantity}</p>
                  </div>
                  <p className="text-black dark:text-white font-bold text-lg shrink-0">₹{((item.productId?.price || 0) * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-black/10 dark:border-white/10">
              <div className="space-y-1">
                <p className="text-neutral-400 text-xs uppercase tracking-widest">Subtotal: <span className="text-black dark:text-white font-bold">₹{subtotal.toLocaleString()}</span></p>
                <p className="text-neutral-400 text-xs uppercase tracking-widest">Shipping: <span className="text-black dark:text-white font-bold">{shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}</span></p>
              </div>
              <p className="text-3xl font-serif text-black dark:text-white">₹{total.toLocaleString()}</p>
            </div>
          </div>
        )}

        <Formik
          initialValues={{ 
            fullName: '', email: '', phone: '', address: '', state: '', city: '', zipCode: ''
          }}
          validationSchema={CheckoutSchema}
          onSubmit={(values, { setSubmitting, setStatus }) => {
            handleCheckoutSubmit(values, setStatus).finally(() => setSubmitting(false));
          }}
        >
          {({ errors, touched, values, setFieldValue, status, isSubmitting }) => (
            <Form className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <ShippingForm errors={errors} touched={touched} values={values} setFieldValue={setFieldValue} />
              <PaymentForm errors={errors} touched={touched} total={total} isSubmitting={isSubmitting} />

              {status && (
                <div className="lg:col-span-2 p-4 bg-red-900/10 border border-red-500/20 text-red-500 rounded-2xl text-xs font-bold uppercase tracking-widest text-center">
                  {status}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/user/checkout')({
  component: Checkout,
});
