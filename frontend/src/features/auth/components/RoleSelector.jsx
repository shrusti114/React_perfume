import React from 'react';
import { User, Store, Shield } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const roles = [
  { 
    id: 'user', 
    label: 'Customer', 
    icon: <User size={18} />, 
    desc: 'Shop & explore perfumes', 
    color: '#f8c8dc', 
    dashboard: '/user/profile' 
  },
  { 
    id: 'seller', 
    label: 'Seller', 
    icon: <Store size={18} />, 
    desc: 'Manage your boutique', 
    color: '#d4af37', 
    dashboard: '/seller/dashboard' 
  },
  { 
    id: 'admin', 
    label: 'Admin', 
    icon: <Shield size={18} />, 
    desc: 'Control panel access', 
    color: '#87CEEB', 
    dashboard: '/admin/dashboard' 
  },
];

export function RoleSelector({ selectedRole, onSelect }) {
  return (
    <div className="mb-6">
      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-3 text-center">
        Select Your Role
      </p>
      <div className="grid grid-cols-3 gap-2">
        {roles.map((role) => {
          const isActive = selectedRole === role.id;
          return (
            <button
              type="button"
              key={role.id}
              onClick={() => onSelect(role.id)}
              className={cn(
                "relative flex flex-col items-center gap-1.5 p-4 rounded-2xl border transition-all duration-300",
                isActive
                  ? 'border-transparent shadow-xl scale-[1.02]'
                  : 'border-neutral-100 bg-neutral-50/50 hover:bg-white hover:border-neutral-200'
              )}
              style={isActive ? {
                background: `linear-gradient(135deg, ${role.color}15, ${role.color}05)`,
                borderColor: `${role.color}50`,
                boxShadow: `0 8px 30px ${role.color}15`,
              } : {}}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: isActive ? `${role.color}20` : 'rgba(255,255,255,0.05)',
                  color: isActive ? role.color : '#666',
                }}
              >
                {role.icon}
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest transition-colors",
                isActive ? 'text-black' : 'text-neutral-400'
              )}>
                {role.label}
              </span>
              <span className="text-[8px] text-neutral-400 font-bold uppercase tracking-tighter">{role.desc}</span>
              {isActive && (
                <div 
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px]" 
                  style={{ 
                    backgroundColor: role.color, 
                    color: role.color === '#d4af37' ? '#fff' : '#000' 
                  }}
                >
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
