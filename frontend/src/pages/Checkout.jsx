import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CreditCard, CheckCircle } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Checkout = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const CheckoutSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip Code is required'),
    country: Yup.string().required('Country is required'),
    cardNumber: Yup.string().required('Card Number is required'),
    expiry: Yup.string().required('Expiry Date is required'),
    cvv: Yup.string().required('CVV is required')
  });

  if (isSuccess) {
    return (
      <div className="bg-[#fafafa] min-h-screen text-neutral-800 flex items-center justify-center font-sans">
        <div className="text-center p-12 max-w-lg bg-white border border-[#000000]/5 shadow-xl rounded-3xl">
          <CheckCircle size={80} className="text-[#FFD1DC] mx-auto mb-8 animate-bounce" />
          <h2 className="text-4xl font-elegant text-[#000000] mb-4">Order Confirmed</h2>
          <p className="text-neutral-500 font-light mb-8">Thank you for your purchase. Your luxury experience with Westion has begun. You will receive an email confirmation shortly.</p>
          <Link to="/" className="inline-flex items-center justify-center gap-2 bg-[#000000] text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FFD1DC] hover:text-[#000000] hover:shadow-lg transition-all transform hover:-translate-y-1">
            Return to Boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen text-neutral-800 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-12">
        <h1 className="text-5xl font-elegant text-[#000000] mb-12">Secure Checkout</h1>

        <Formik
          initialValues={{ fullName: '', email: '', address: '', city: '', zipCode: '', country: '', cardNumber: '', expiry: '', cvv: '' }}
          validationSchema={CheckoutSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setIsSuccess(true);
              setSubmitting(false);
            }, 1000);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Shipping Information */}
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-3xl border border-[#000000]/5 shadow-sm">
                  <h3 className="text-2xl font-elegant text-[#000000] mb-8">Shipping Address</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Full Name</label>
                      <Field name="fullName" className="w-full bg-[#fafafa] border border-[#000000]/10 px-6 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-colors placeholder-neutral-400" placeholder="John Doe" />
                      {errors.fullName && touched.fullName && <div className="text-red-500 text-xs mt-2 ml-2 font-semibold">{errors.fullName}</div>}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Email Address</label>
                      <Field name="email" type="email" className="w-full bg-[#fafafa] border border-[#000000]/10 px-6 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-colors placeholder-neutral-400" placeholder="john@example.com" />
                      {errors.email && touched.email && <div className="text-red-500 text-xs mt-2 ml-2 font-semibold">{errors.email}</div>}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Street Address</label>
                      <Field name="address" className="w-full bg-[#fafafa] border border-[#000000]/10 px-6 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-colors placeholder-neutral-400" placeholder="123 Luxury Ave" />
                      {errors.address && touched.address && <div className="text-red-500 text-xs mt-2 ml-2 font-semibold">{errors.address}</div>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">City</label>
                        <Field name="city" className="w-full bg-[#fafafa] border border-[#000000]/10 px-6 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-colors placeholder-neutral-400" placeholder="New York" />
                        {errors.city && touched.city && <div className="text-red-500 text-xs mt-2 ml-2 font-semibold">{errors.city}</div>}
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Zip Code</label>
                        <Field name="zipCode" className="w-full bg-[#fafafa] border border-[#000000]/10 px-6 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-colors placeholder-neutral-400" placeholder="10001" />
                        {errors.zipCode && touched.zipCode && <div className="text-red-500 text-xs mt-2 ml-2 font-semibold">{errors.zipCode}</div>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Country</label>
                      <Field name="country" className="w-full bg-[#fafafa] border border-[#000000]/10 px-6 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-colors placeholder-neutral-400" placeholder="United States" />
                      {errors.country && touched.country && <div className="text-red-500 text-xs mt-2 ml-2 font-semibold">{errors.country}</div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info & Summary */}
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-3xl border border-[#000000]/5 shadow-sm">
                  <h3 className="text-2xl font-elegant text-[#000000] mb-8 flex items-center gap-3"><CreditCard size={24} className="text-[#FFD1DC]" /> Payment Details</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Card Number</label>
                      <Field name="cardNumber" type="password" className="w-full bg-[#fafafa] border border-[#000000]/10 px-6 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-colors placeholder-neutral-400" placeholder="**** **** **** ****" />
                      {errors.cardNumber && touched.cardNumber && <div className="text-red-500 text-xs mt-2 ml-2 font-semibold">{errors.cardNumber}</div>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Expiry Date</label>
                        <Field name="expiry" className="w-full bg-[#fafafa] border border-[#000000]/10 px-6 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-colors placeholder-neutral-400" placeholder="MM/YY" />
                        {errors.expiry && touched.expiry && <div className="text-red-500 text-xs mt-2 ml-2 font-semibold">{errors.expiry}</div>}
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">CVV</label>
                        <Field name="cvv" type="password" className="w-full bg-[#fafafa] border border-[#000000]/10 px-6 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-colors placeholder-neutral-400" placeholder="123" />
                        {errors.cvv && touched.cvv && <div className="text-red-500 text-xs mt-2 ml-2 font-semibold">{errors.cvv}</div>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#fafafa] p-8 rounded-3xl border border-[#000000]/10 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-lg text-[#000000] font-bold uppercase tracking-widest text-sm">Total to Pay</span>
                    <span className="text-5xl font-elegant text-[#000000]">$605.00</span>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full flex items-center justify-center gap-3 bg-[#000000] text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#FFD1DC] hover:text-[#000000] transition-all transform hover:-translate-y-1 shadow-md"
                  >
                    <ShieldCheck size={20} /> Submit Payment
                  </button>
                  <p className="text-center text-xs text-neutral-500 mt-6 flex items-center justify-center gap-2 font-bold">
                    <ShieldCheck size={14} className="text-[#FFD1DC]" /> Payments are encrypted and secure.
                  </p>
                </div>
              </div>

            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
};

export default Checkout;
