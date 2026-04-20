import React from 'react';
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '../../../utils/cn';

const steps = [
  { id: 'placed', label: 'Order Placed', icon: <Package size={20} /> },
  { id: 'processing', label: 'Processing', icon: <Clock size={20} /> },
  { id: 'shipped', label: 'Shipped', icon: <Truck size={20} /> },
  { id: 'delivered', label: 'Delivered', icon: <CheckCircle2 size={20} /> },
];

export function OrderProgress({ status }) {
  // Normalize status from backend
  const statusMap = {
    'Pending': 'placed',
    'Processing': 'processing',
    'Shipped': 'shipped',
    'Delivered': 'delivered',
    'Cancelled': 'cancelled'
  };
  
  const normalizedStatus = statusMap[status] || status.toLowerCase();
  const currentStepIndex = steps.findIndex(s => s.id === normalizedStatus);

  return (
    <div className="relative flex justify-between items-center w-full max-w-2xl mx-auto py-12">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-200 dark:bg-white/10 -translate-y-1/2 z-0" />
      
      {/* Progress Line */}
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-[#f8c8dc] -translate-y-1/2 z-0 transition-all duration-1000"
        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((step, index) => {
        const isCompleted = index <= currentStepIndex;
        const isCurrent = index === currentStepIndex;

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <div 
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                isCompleted 
                  ? "bg-black text-[#f8c8dc] border-black dark:bg-white dark:text-black dark:border-white" 
                  : "bg-neutral-100 text-neutral-400 border-neutral-200 dark:bg-neutral-900 dark:border-white/5"
              )}
            >
              {step.icon}
              {isCurrent && (
                <div className="absolute -inset-1 rounded-full border border-[#f8c8dc] animate-ping opacity-50" />
              )}
            </div>
            <div className="absolute top-16 whitespace-nowrap text-center">
              <p className={cn(
                "text-[10px] uppercase tracking-widest font-bold",
                isCompleted ? "text-black dark:text-white" : "text-neutral-400"
              )}>
                {step.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
