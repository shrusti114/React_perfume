import React from 'react';
import { Package, Truck, CheckCircle2, Clock, Box, Navigation } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { motion } from 'framer-motion';

const steps = [
  { id: 'Pending', label: 'Pending', icon: <Package size={18} />, description: 'Your essence request has been received.' },
  { id: 'Confirmed', label: 'Confirmed', icon: <Clock size={18} />, description: 'Our artisans are preparing your collection.' },
  { id: 'Shipped', label: 'Shipped', icon: <Box size={18} />, description: 'Your parcel has left the Velvora vault.' },
  { id: 'Delivered', label: 'Delivered', icon: <CheckCircle2 size={18} />, description: 'Mission complete. Enjoy your elegance.' },
];

export function OrderTimeline({ status, history = [] }) {
  // Map history to steps for easy lookup
  const historyMap = history.reduce((acc, item) => {
    acc[item.status] = item.timestamp;
    return acc;
  }, {});

  const currentStepIndex = steps.findIndex(s => s.id === status);
  const activeIndex = currentStepIndex === -1 ? 0 : currentStepIndex;

  return (
    <div className="relative pl-8 space-y-12">
      {/* Vertical Line */}
      <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-neutral-200 dark:bg-white/5 z-0" />
      
      {/* Active Progress Line */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: `${(activeIndex / (steps.length - 1)) * 100}%` }}
        className="absolute left-[15px] top-2 w-0.5 bg-[#f8c8dc] z-0 origin-top transition-all duration-1000"
      />

      {steps.map((step, index) => {
        const isCompleted = index <= activeIndex;
        const isCurrent = index === activeIndex;
        const timestamp = historyMap[step.id];

        return (
          <motion.div 
            key={step.id} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative z-10 flex gap-8 items-start"
          >
            {/* Step Icon Node */}
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border-2 shrink-0 bg-black dark:bg-[#0a0a0a]",
                isCompleted 
                  ? "text-[#f8c8dc] border-[#f8c8dc] shadow-[0_0_15px_rgba(248,200,220,0.3)]" 
                  : "text-neutral-600 border-neutral-100 dark:border-white/5"
              )}
            >
              {step.icon}
              {isCurrent && status !== 'Delivered' && (
                <div className="absolute -inset-1 rounded-full border border-[#f8c8dc] animate-ping opacity-30" />
              )}
            </div>

            {/* Step Label & Description */}
            <div className="space-y-1">
              <div className="flex items-center gap-4">
                <h4 className={cn(
                  "text-[10px] font-black uppercase tracking-[0.3em]",
                  isCompleted ? "text-white" : "text-neutral-500"
                )}>
                  {step.label}
                </h4>
                {timestamp && (
                  <span className="text-[9px] text-neutral-600 font-bold bg-white/5 px-2 py-0.5 rounded-full">
                    {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
              <p className="text-neutral-500 text-[11px] leading-relaxed max-w-xs transition-colors">
                {step.description}
              </p>
              {timestamp && (
                <p className="text-[9px] text-[#f8c8dc]/60 font-bold uppercase tracking-widest mt-2">
                  {new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
