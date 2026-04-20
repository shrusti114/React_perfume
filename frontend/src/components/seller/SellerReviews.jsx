import React, { useState } from 'react';
import { Star, MessageSquare, Filter, Search, MoreHorizontal, Reply } from 'lucide-react';

const mockReviews = [
  { id: 1, name: 'Thanha Islam', time: '2 hours ago', product: 'Velvet Musk', text: 'Absolutely love this scent. It lasts all day and feels incredibly premium.', rating: 5.0, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200', replied: false },
  { id: 2, name: 'Michael Chen', time: '1 day ago', product: 'Floral Whisper', text: 'A bit too sweet for my taste, but the packaging is gorgeous.', rating: 3.5, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200', replied: true },
  { id: 3, name: 'Sarah Jenkins', time: '3 days ago', product: 'Ocean Breeze', text: 'Refined and elegant. I have recommended it to all my colleagues.', rating: 5.0, image: 'https://images.unsplash.com/photo-1531123897727-8f129e1b88ce?q=80&w=200', replied: false },
  { id: 4, name: 'David Smith', time: '1 week ago', product: 'Midnight Oud', text: 'Strong and captivating. Perfect for evening events.', rating: 4.5, image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200', replied: false },
  { id: 5, name: 'Emma Wilson', time: '2 weeks ago', product: 'Velvet Musk', text: 'The delivery was a bit delayed, but the perfume is fantastic.', rating: 4.0, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200', replied: true },
];

const SellerReviews = () => {
  const [filterRating, setFilterRating] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const filteredReviews = mockReviews.filter(review => {
    const matchesFilter = filterRating === 'All' || Math.floor(review.rating) === parseInt(filterRating);
    const matchesSearch = review.name.toLowerCase().includes(searchTerm.toLowerCase()) || review.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const avgRating = (mockReviews.reduce((acc, curr) => acc + curr.rating, 0) / mockReviews.length).toFixed(1);

  const handleReplySubmit = (e, id) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    // In a real app, API call goes here
    alert(`Reply sent to review ${id}: ${replyText}`);
    setReplyingTo(null);
    setReplyText('');
  };

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map(star => (
      <Star 
        key={star} 
        size={14} 
        className={`${star <= Math.floor(rating) ? 'text-[#D9A0A0] dark:text-[#00D4FF] fill-current' : 'text-neutral-300 dark:text-gray-700'}`} 
      />
    ));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Header & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="md:col-span-1 bg-white dark:bg-[#202231] rounded-[2.5rem] p-8 border border-[#D9A0A0]/10 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#D9A0A0]/5 dark:bg-[#00D4FF]/5 rounded-full blur-[40px] pointer-events-none"></div>
           <h3 className="text-[11px] font-bold text-neutral-400 dark:text-gray-500 uppercase tracking-widest mb-4">Average Rating</h3>
           <div className="flex items-center gap-2 text-5xl font-bold text-neutral-800 dark:text-white tracking-tighter mb-4">
             {avgRating} <span className="text-2xl text-[#D9A0A0] dark:text-[#00D4FF]">/ 5.0</span>
           </div>
           <div className="flex items-center gap-1 mb-2">
             {renderStars(parseFloat(avgRating))}
           </div>
           <p className="text-[10px] text-neutral-400 dark:text-gray-500 font-bold uppercase tracking-widest">Based on {mockReviews.length} Reviews</p>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-[#202231] rounded-[2.5rem] p-8 border border-[#D9A0A0]/10 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-xl flex flex-col justify-center space-y-6">
           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="w-full sm:w-2/3 relative group">
               <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search reviews by name or keyword..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-[#FAFAFA] dark:bg-[#1a1c27] border border-[#D9A0A0]/20 dark:border-white/5 pl-12 pr-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] outline-none text-neutral-800 dark:text-white text-xs shadow-inner transition-all"
               />
             </div>
             <div className="w-full sm:w-1/3 relative group">
               <Filter size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
               <select 
                 value={filterRating}
                 onChange={(e) => setFilterRating(e.target.value)}
                 className="w-full bg-[#FAFAFA] dark:bg-[#1a1c27] border border-[#D9A0A0]/20 dark:border-white/5 pl-12 pr-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] outline-none text-neutral-800 dark:text-white text-xs shadow-inner transition-all appearance-none cursor-pointer"
               >
                 <option value="All">All Ratings</option>
                 <option value="5">5 Stars</option>
                 <option value="4">4 Stars</option>
                 <option value="3">3 Stars</option>
                 <option value="2">2 Stars</option>
                 <option value="1">1 Star</option>
               </select>
             </div>
           </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <div className="bg-white dark:bg-[#202231] rounded-[2.5rem] p-20 border border-[#D9A0A0]/10 dark:border-white/5 flex flex-col items-center justify-center text-center shadow-sm">
             <MessageSquare size={48} className="text-neutral-200 dark:text-gray-600 mb-6" />
             <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-gray-500">No client feedback matches your criteria.</p>
          </div>
        ) : (
          filteredReviews.map(review => (
            <div key={review.id} className="bg-white dark:bg-[#202231] rounded-[2rem] p-8 border border-[#D9A0A0]/10 dark:border-white/5 shadow-[0_4px_20px_rgb(0,0,0,0.02)] dark:shadow-xl hover:border-[#D9A0A0]/30 dark:hover:border-[#00D4FF]/30 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-neutral-400 hover:text-[#D9A0A0] dark:hover:text-[#00D4FF]">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-[#D9A0A0]/20 dark:border-[#00D4FF]/20 shadow-sm relative group-hover:scale-105 transition-transform duration-500">
                    <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                    <div>
                      <h4 className="font-bold text-neutral-800 dark:text-white tracking-wide text-sm">{review.name}</h4>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 dark:text-gray-500 mt-1">{review.time} • {review.product}</p>
                    </div>
                    <div className="flex gap-1 bg-[#FAFAFA] dark:bg-[#1a1c27] border border-[#D9A0A0]/10 dark:border-white/5 px-3 py-1.5 rounded-full shadow-sm">
                      {renderStars(review.rating)}
                      <span className="text-neutral-800 dark:text-white font-bold text-[10px] ml-2">{review.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-neutral-600 dark:text-gray-300 text-sm leading-relaxed mb-6 italic">
                    "{review.text}"
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 border-t border-[#D9A0A0]/10 dark:border-white/5 pt-4">
                    {review.replied ? (
                       <span className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-2">
                         <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Responded
                       </span>
                    ) : (
                       <button 
                         onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                         className="flex items-center gap-2 text-[#D9A0A0] dark:text-[#00D4FF] hover:bg-[#D9A0A0]/10 dark:hover:bg-[#00D4FF]/10 text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full transition-colors border border-transparent hover:border-[#D9A0A0]/20 dark:hover:border-[#00D4FF]/20"
                       >
                         <Reply size={14} /> Reply to Customer
                       </button>
                    )}
                  </div>

                  {/* Reply Box */}
                  {replyingTo === review.id && (
                     <div className="mt-6 animate-in slide-in-from-top-2 duration-300">
                       <form onSubmit={(e) => handleReplySubmit(e, review.id)}>
                         <div className="relative">
                           <textarea 
                             autoFocus
                             placeholder="Write a public response..."
                             value={replyText}
                             onChange={(e) => setReplyText(e.target.value)}
                             className="w-full bg-[#FAFAFA] dark:bg-[#1a1c27] border border-[#D9A0A0]/20 dark:border-white/5 rounded-2xl p-4 text-xs text-neutral-800 dark:text-white outline-none focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] resize-none min-h-[100px] shadow-inner transition-colors"
                           />
                         </div>
                         <div className="flex justify-end mt-3 gap-3">
                           <button 
                             type="button" 
                             onClick={() => { setReplyingTo(null); setReplyText(''); }}
                             className="px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-colors border border-[#D9A0A0]/10 dark:border-white/5 rounded-xl bg-white dark:bg-[#202231] shadow-sm"
                           >
                             Cancel
                           </button>
                           <button 
                             type="submit"
                             disabled={!replyText.trim()}
                             className="px-5 py-2 text-[9px] font-bold uppercase tracking-widest text-white dark:text-black bg-[#D9A0A0] dark:bg-[#00D4FF] hover:bg-[#E5B5B5] dark:hover:bg-cyan-300 rounded-xl transition-colors shadow-[0_4px_15px_rgba(217,160,160,0.3)] dark:shadow-[0_0_15px_rgba(0,212,255,0.4)] disabled:opacity-50"
                           >
                             Post Reply
                           </button>
                         </div>
                       </form>
                     </div>
                  )}

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerReviews;
