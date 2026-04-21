import React from 'react';
import { cn } from '../../../utils/cn';
import { motion } from 'framer-motion';

const steps = [
  { 
    id: 'Processing', 
    dbStatus: ['Processing'],
    label: 'PROCESSING', 
    description: 'Crafting & packaging your chosen essence within the Velvora secure vault.' 
  },
  { 
    id: 'Shipped', 
    dbStatus: ['Shipped'],
    label: 'SHIPPED', 
    description: 'Your singular fragrance is being whisked across the country for final dispatch.' 
  },
  { 
    id: 'Delivered', 
    dbStatus: ['Delivered'],
    label: 'DELIVERED', 
    description: 'A signature of sheer excellence has reached its final destination coordinates.' 
  },
];

export function OrderTimeline({ status, orderId }) {
  // Find current step index based on the DB status mapping
  const currentStepIndex = steps.findIndex(s => s.dbStatus.includes(status));
  const activeIndex = currentStepIndex === -1 ? 0 : currentStepIndex;

  return (
    <div className="relative pl-10 space-y-16">
      {/* Background Vertical Line */}
      <div className="absolute left-[7px] top-4 bottom-4 w-0.5 bg-white/5 z-0" />
      
      {/* Active Vertical Line */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: `${(activeIndex / (steps.length - 1)) * 100}%` }}
        className="absolute left-[7px] top-4 w-0.5 bg-[#f8c8dc] z-0 origin-top transition-all duration-1000"
      />

      {steps.map((step, index) => {
        const isCompleted = index <= activeIndex;
        const isCurrent = index === activeIndex;
        const statusLabel = status === 'Processing' ? 'Pending' : status;

        return (
          <motion.div 
            key={step.id} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative z-10 flex flex-col items-start gap-4"
          >
            {/* Timeline Dot */}
            <div 
              className={cn(
                "absolute -left-[37px] w-4 h-4 rounded-full border-2 bg-[#050505] transition-all duration-700",
                isCompleted 
                  ? "border-[#f8c8dc] shadow-[0_0_15px_rgba(248,200,220,0.5)]" 
                  : "border-neutral-800"
              )}
            >
              {isCurrent && (
                <div className="absolute inset-0 rounded-full bg-[#f8c8dc] animate-pulse" />
              )}
            </div>

            {/* Content Segment */}
            <div className={cn(
              "space-y-4 transition-opacity duration-500",
              isCompleted ? "opacity-100" : "opacity-30"
            )}>
              <h4 className="text-[#f8c8dc] text-xs font-black uppercase tracking-[0.4em] mb-4">
                {step.label}
              </h4>
              
              <p className="text-neutral-500 text-sm leading-relaxed max-w-sm font-light">
                {step.description}
              </p>

              {/* Status Footer shown in screenshot */}
              <div className="flex items-center gap-2 pt-2">
                 <span className="text-[10px] text-[#f8c8dc] font-bold tracking-widest">
                  {orderId || 'ORD002'}
                </span>
                <span className="text-neutral-700">|</span>
                <span className="text-neutral-500 text-[10px] font-bold tracking-widest">
                  {status || 'Pending'}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
