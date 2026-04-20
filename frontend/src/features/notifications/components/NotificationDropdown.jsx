import React from 'react';
import { useNotifications } from '../../../context/NotificationContext';
import { Bell, Check, Trash2, ExternalLink, Clock } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';

export function NotificationDropdown({ isOpen, onClose }) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll, loading } = useNotifications();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop to close */}
          <div className="fixed inset-0 z-40" onClick={onClose} />
          
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-4 w-96 bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-black/5 dark:border-white/10 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-neutral-50/50 dark:bg-white/5">
              <div>
                <h3 className="text-xl font-serif text-black dark:text-white flex items-center gap-3">
                  Notifications <span className="text-[#f8c8dc] text-sm font-sans font-bold uppercase tracking-widest">{unreadCount}</span>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => markAllAsRead()}
                  className="p-2 hover:bg-[#f8c8dc]/10 rounded-full transition-colors text-[#f8c8dc]"
                  title="Mark all as read"
                >
                  <Check size={16} />
                </button>
                <button 
                  onClick={() => clearAll()}
                  className="p-2 hover:bg-red-500/10 rounded-full transition-colors text-red-400"
                  title="Clear all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="py-20 text-center">
                  <Bell size={40} className="mx-auto mb-4 text-neutral-200 dark:text-neutral-800" strokeWidth={1} />
                  <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-bold">Silence in the vault.</p>
                </div>
              ) : (
                <div className="divide-y divide-black/5 dark:divide-white/5">
                  {notifications.map((notification) => (
                    <div 
                      key={notification._id}
                      className={`p-5 flex gap-4 hover:bg-neutral-50 dark:hover:bg-white/5 transition-all group ${!notification.isRead ? 'bg-[#f8c8dc]/5 border-l-4 border-l-[#f8c8dc]' : 'border-l-4 border-l-transparent'}`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!notification.isRead ? 'bg-[#f8c8dc]' : 'bg-transparent'}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs leading-relaxed mb-2 ${notification.isRead ? 'text-neutral-500' : 'text-black dark:text-white font-medium'}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[9px] text-neutral-400 uppercase tracking-widest font-bold">
                            <Clock size={10} />
                            {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.isRead && (
                              <button 
                                onClick={() => markAsRead(notification._id)}
                                className="text-[9px] uppercase tracking-widest font-bold text-[#f8c8dc] hover:underline"
                              >
                                Mark Read
                              </button>
                            )}
                            {notification.actionUrl && (
                              <Link 
                                to={notification.actionUrl}
                                onClick={onClose}
                                className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 hover:text-black dark:hover:text-white flex items-center gap-1"
                              >
                                <ExternalLink size={10} />
                                Details
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <Link 
              to="/notifications"
              onClick={onClose}
              className="block p-4 text-center text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 hover:text-[#f8c8dc] bg-neutral-50 dark:bg-white/5 transition-colors"
            >
              View All Notifications
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
