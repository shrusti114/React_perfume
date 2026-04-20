import React from 'react';
import { Field, ErrorMessage } from 'formik';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Puducherry', 'Jammu & Kashmir', 'Ladakh',
];

const indianCities = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Navi Mumbai', 'Kolhapur'],
  'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
  'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Gulbarga'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Tirunelveli'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Bhavnagar'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner'],
  'Uttar Pradesh': ['Lucknow', 'Noida', 'Agra', 'Varanasi', 'Kanpur', 'Ghaziabad', 'Meerut', 'Prayagraj'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol'],
  'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam'],
  'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
  'Haryana': ['Gurgaon', 'Faridabad', 'Panipat', 'Ambala', 'Hisar', 'Karnal'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg'],
  'Assam': ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Nagaon'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Haldwani'],
  'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Solan', 'Mandi'],
  'Jammu & Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla'],
  'Chandigarh': ['Chandigarh'],
  'Puducherry': ['Puducherry', 'Karaikal'],
  'Sikkim': ['Gangtok', 'Namchi'],
  'Manipur': ['Imphal', 'Thoubal'],
  'Meghalaya': ['Shillong', 'Tura'],
  'Mizoram': ['Aizawl', 'Lunglei'],
  'Nagaland': ['Kohima', 'Dimapur'],
  'Tripura': ['Agartala', 'Udaipur'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun'],
  'Ladakh': ['Leh', 'Kargil'],
};

export function ShippingForm({ errors, touched, values, setFieldValue }) {
  const selectedState = values?.state || '';
  const cityOptions = indianCities[selectedState] || [];

  return (
    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm">
      <h3 className="text-2xl font-serif text-black dark:text-white mb-8">Shipping Address</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">Full Name *</label>
          <Field 
            name="fullName" 
            className={`w-full bg-neutral-50 dark:bg-black border ${errors.fullName && touched.fullName ? 'border-red-400 dark:border-red-500' : 'border-black/10 dark:border-white/20'} px-6 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc] transition-colors placeholder-neutral-400`} 
            placeholder="John Doe" 
          />
          <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">Email Address *</label>
            <Field 
              name="email" 
              type="email" 
              className={`w-full bg-neutral-50 dark:bg-black border ${errors.email && touched.email ? 'border-red-400 dark:border-red-500' : 'border-black/10 dark:border-white/20'} px-6 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc] transition-colors placeholder-neutral-400`} 
              placeholder="john@example.com" 
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">Phone Number *</label>
            <Field 
              name="phone" 
              type="tel" 
              className={`w-full bg-neutral-50 dark:bg-black border ${errors.phone && touched.phone ? 'border-red-400 dark:border-red-500' : 'border-black/10 dark:border-white/20'} px-6 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc] transition-colors placeholder-neutral-400`} 
              placeholder="9876543210" 
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">Street Address *</label>
          <Field 
            name="address" 
            className={`w-full bg-neutral-50 dark:bg-black border ${errors.address && touched.address ? 'border-red-400 dark:border-red-500' : 'border-black/10 dark:border-white/20'} px-6 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc] transition-colors placeholder-neutral-400`} 
            placeholder="123 Luxury Avenue, Suite 100" 
          />
          <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">State *</label>
            <select 
              name="state"
              value={selectedState}
              onChange={(e) => {
                setFieldValue('state', e.target.value);
                setFieldValue('city', '');
              }}
              className={`w-full bg-neutral-50 dark:bg-black border ${errors.state && touched.state ? 'border-red-400 dark:border-red-500' : 'border-black/10 dark:border-white/20'} px-6 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc] transition-colors`} 
            >
              <option value="">Select State</option>
              {indianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <ErrorMessage name="state" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">City *</label>
            <select 
              name="city"
              value={values?.city || ''}
              disabled={!selectedState}
              onChange={(e) => setFieldValue('city', e.target.value)}
              className={`w-full bg-neutral-50 dark:bg-black border ${errors.city && touched.city ? 'border-red-400 dark:border-red-500' : 'border-black/10 dark:border-white/20'} px-6 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed`} 
            >
              <option value="">{selectedState ? 'Select City' : 'Select State first'}</option>
              {cityOptions.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <ErrorMessage name="city" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">Pin Code *</label>
          <Field 
            name="zipCode" 
            className={`w-full bg-neutral-50 dark:bg-black border ${errors.zipCode && touched.zipCode ? 'border-red-400 dark:border-red-500' : 'border-black/10 dark:border-white/20'} px-6 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc] transition-colors placeholder-neutral-400`} 
            placeholder="400001" 
            maxLength={6}
          />
          <ErrorMessage name="zipCode" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
        </div>
      </div>
    </div>
  );
}
