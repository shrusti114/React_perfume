import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen text-neutral-800 font-sans">
      
      {/* Page Header */}
      <div className="py-24 px-6 max-w-7xl mx-auto lg:px-12 text-center">
        <h1 className="text-5xl md:text-7xl font-elegant text-black dark:text-white mb-6">Client Care</h1>
        <p className="text-neutral-500 font-light max-w-2xl mx-auto text-lg leading-relaxed">
          Whether you desire a personalized fragrance consultation or require assistance with an existing order, the Westion concierge team is at your complete disposal.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h3 className="text-2xl font-elegant text-black dark:text-white mb-8">Boutique Information</h3>
              <p className="text-neutral-500 font-light mb-12">
                Experience the world of Westion in person. We invite you to visit our flagship boutique for a private olfactory journey.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="pt-1 text-black dark:text-white group-hover:text-[#FFD1DC] dark:text-[#f8c8dc] dark:hover:text-[#f8c8dc] transition-colors"><MapPin size={24} /></div>
                <div>
                  <h4 className="text-black dark:text-white font-bold text-xs uppercase tracking-widest mb-2">Maison Westion</h4>
                  <p className="text-neutral-500 font-light leading-relaxed">124 Avenue des Champs-Élysées<br />75008 Paris, France</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="pt-1 text-black dark:text-white group-hover:text-[#FFD1DC] dark:text-[#f8c8dc] dark:hover:text-[#f8c8dc] transition-colors"><Phone size={24} /></div>
                <div>
                  <h4 className="text-black dark:text-white font-bold text-xs uppercase tracking-widest mb-2">Concierge Phone</h4>
                  <p className="text-neutral-500 font-light leading-relaxed">+33 1 40 70 20 00</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="pt-1 text-black dark:text-white group-hover:text-[#FFD1DC] dark:text-[#f8c8dc] dark:hover:text-[#f8c8dc] transition-colors"><Mail size={24} /></div>
                <div>
                  <h4 className="text-black dark:text-white font-bold text-xs uppercase tracking-widest mb-2">General Inquiries</h4>
                  <p className="text-neutral-500 font-light leading-relaxed">concierge@westion.com</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="pt-1 text-black dark:text-white group-hover:text-[#FFD1DC] dark:text-[#f8c8dc] dark:hover:text-[#f8c8dc] transition-colors"><Clock size={24} /></div>
                <div>
                  <h4 className="text-black dark:text-white font-bold text-xs uppercase tracking-widest mb-2">Boutique Hours</h4>
                  <p className="text-neutral-500 font-light leading-relaxed">Monday - Saturday: 10:00 - 19:30<br />Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#FFD1DC] dark:bg-[#f8c8dc]/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-elegant text-black dark:text-white mb-8">Send a Message</h3>

                {isSubmitted ? (
                  <div className="bg-neutral-50 dark:bg-black border border-black/10 dark:border-white/20 rounded-2xl p-8 text-center animate-pulse">
                    <h4 className="text-black dark:text-white font-bold text-xl mb-4">Message Received</h4>
                    <p className="text-neutral-500 leading-relaxed font-light">Thank you for contacting Westion. One of our concierges will review your inquiry and respond within 24 hours.</p>
                  </div>
                ) : (
                  <Formik
                    initialValues={{ name: '', email: '', subject: '', message: '' }}
                    validationSchema={ContactSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        setIsSubmitted(true);
                        setSubmitting(false);
                      }, 1000);
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] dark:text-[#f8c8dc] font-bold mb-2 ml-1 text-black">Your Name</label>
                            <Field
                              type="text"
                              name="name"
                              placeholder="John Doe"
                              className="w-full bg-neutral-50 dark:bg-black border border-black/10 dark:border-white/20 px-6 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#FFD1DC] dark:focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#FFD1DC] dark:focus:ring-[#f8c8dc] transition-colors placeholder-neutral-400"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
                          </div>

                          <div>
                            <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] dark:text-[#f8c8dc] font-bold mb-2 ml-1 text-black">Email Address</label>
                            <Field
                              type="email"
                              name="email"
                              placeholder="you@example.com"
                              className="w-full bg-neutral-50 dark:bg-black border border-black/10 dark:border-white/20 px-6 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#FFD1DC] dark:focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#FFD1DC] dark:focus:ring-[#f8c8dc] transition-colors placeholder-neutral-400"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] dark:text-[#f8c8dc] font-bold mb-2 ml-1 text-black">Subject</label>
                          <Field
                            as="select"
                            name="subject"
                            className="w-full bg-neutral-50 dark:bg-black border border-black/10 dark:border-white/20 px-6 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#FFD1DC] dark:focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#FFD1DC] dark:focus:ring-[#f8c8dc] transition-colors appearance-none"
                          >
                            <option value="">Select an inquiry type...</option>
                            <option value="Consultation">Fragrance Consultation</option>
                            <option value="Order">Order Status / Issue</option>
                            <option value="Press">Press & Media</option>
                            <option value="Other">Other Inquiry</option>
                          </Field>
                          <ErrorMessage name="subject" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] dark:text-[#f8c8dc] font-bold mb-2 ml-1 text-black">Your Message</label>
                          <Field
                            as="textarea"
                            name="message"
                            rows="5"
                            placeholder="How may we assist you today?"
                            className="w-full bg-neutral-50 dark:bg-black border border-black/10 dark:border-white/20 px-6 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#FFD1DC] dark:focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#FFD1DC] dark:focus:ring-[#f8c8dc] transition-colors placeholder-neutral-400 resize-none"
                          />
                          <ErrorMessage name="message" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto flex items-center justify-center gap-3 bg-black dark:bg-white/10 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FFD1DC] dark:bg-[#f8c8dc] dark:hover:bg-[#f8c8dc] hover:text-black dark:text-white hover:shadow-lg transition-all transform hover:-translate-y-1"
                        >
                          <Send size={18} /> Send Inquiry
                        </button>
                      </Form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
