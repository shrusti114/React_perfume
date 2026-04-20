import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, Trash2, Check, ExternalLink, Clock, Inbox } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, clearAll, loading } = useNotifications();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black pt-32 pb-20 px-6 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-black/5 dark:border-white/5 pb-12">
          <div>
            <h1 className="text-5xl font-serif text-black dark:text-white mb-4">Notifications</h1>
            <p className="text-neutral-500 text-[10px] uppercase tracking-[0.4em] font-bold">Stay updated with your latest activities</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-neutral-600 dark:text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-[#f8c8dc] dark:hover:text-black transition-all shadow-sm"
            >
              <Check size={14} /> Mark All Read
            </button>
            <button 
              onClick={clearAll}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm"
            >
              <Trash2 size={14} /> Purge Vault
            </button>
          </div>
        </div>

        {/* List */}
        {notifications.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#0a0a0a] rounded-[3rem] p-24 text-center border border-black/5 dark:border-white/5 shadow-sm"
          >
            <Inbox size={64} className="mx-auto mb-8 text-neutral-100 dark:text-neutral-900" strokeWidth={1} />
            <h3 className="text-2xl font-serif text-black dark:text-white mb-4">Empty Frequency</h3>
            <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-bold mb-8">No new intelligence has been received.</p>
            <Link to="/shop" className="text-[#f8c8dc] text-[10px] uppercase underline tracking-[0.2em] font-bold">Return to Command Center</Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={notification._id}
                className={`group relative overflow-hidden bg-white dark:bg-[#0a0a0a] rounded-[2rem] p-8 border transition-all flex flex-col md:flex-row md:items-center gap-8 ${
                  !notification.isRead 
                  ? 'border-[#f8c8dc]/30 shadow-[0_10px_30px_rgba(248,200,220,0.05)]' 
                  : 'border-black/5 dark:border-white/5 opacity-80'
                }`}
              >
                {/* Unread Glow */}
                {!notification.isRead && (
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#f8c8dc]" />
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold ${
                      notification.type === 'success' ? 'bg-green-500/10 text-green-500' :
                      notification.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-[#f8c8dc]/10 text-[#f8c8dc]'
                    }`}>
                      {notification.type || 'Alert'}
                    </span>
                    <div className="flex items-center gap-2 text-[9px] text-neutral-400 uppercase tracking-widest font-bold">
                      <Clock size={12} />
                      {new Date(notification.createdAt).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })} at {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <h4 className={`text-lg transition-colors ${notification.isRead ? 'text-neutral-500' : 'text-black dark:text-white'}`}>
                    {notification.message}
                  </h4>
                </div>

                <div className="flex items-center gap-4">
                  {!notification.isRead && (
                    <button 
                      onClick={() => markAsRead(notification._id)}
                      className="p-4 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-400 hover:text-[#f8c8dc] hover:scale-110 transition-all border border-transparent hover:border-[#f8c8dc]/20"
                      title="Clear from unread"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  {notification.actionUrl && (
                    <Link 
                      to={notification.actionUrl}
                      className="flex items-center gap-3 px-8 py-4 rounded-full bg-black dark:bg-[#f8c8dc] text-white dark:text-black text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
                    >
                      Examine <ExternalLink size={14} />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/notifications')({
  component: NotificationsPage,
});
