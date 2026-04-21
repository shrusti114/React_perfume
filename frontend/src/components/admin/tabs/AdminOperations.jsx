import React, { useState } from 'react';
import { Download, Filter, Eye, DollarSign, Package } from 'lucide-react';
import { DataTable } from '../../ui/DataTable';

const AdminOperations = ({ ordersData, isOrdersLoading, updateOrderStatus, paymentsData, isPaymentsLoading }) => {
  const [opTab, setOpTab] = useState('orders'); // 'orders' or 'payments'

  const formatDate = (dateString) => {
    if (!dateString) return 'PENDING';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'MANIFEST ERROR' : date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
  };

  return (
    <div className="space-y-12 pb-20 animate-in slide-in-from-left duration-700">
      {/* Tab Switcher */}
      <div className="flex gap-4 p-1.5 glass-panel w-max rounded-2xl mb-8">
        {[
          { id: 'orders', label: 'Order Manifest', icon: <Package size={14} /> },
          { id: 'payments', label: 'Transaction Ledger', icon: <DollarSign size={14} /> }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setOpTab(t.id)}
            className={`flex items-center gap-3 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
              opTab === t.id ? 'bg-[var(--admin-accent)] text-black shadow-lg' : 'text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)]'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--admin-text-primary)] tracking-wider uppercase opacity-90">
              {opTab === 'orders' ? 'Logistics Flow' : 'Fiscal Intelligence'}
            </h3>
            <p className="text-[9px] text-[var(--admin-text-secondary)] font-bold uppercase tracking-[0.2em] mt-2">
              Viewing {opTab === 'orders' ? ordersData?.length : paymentsData?.length} active entries
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 glass-panel rounded-xl text-[10px] font-bold uppercase text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] transition-all">
            <Download size={14}/> Export Manifest
          </button>
      </div>

      {opTab === 'orders' ? (
        isOrdersLoading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[var(--admin-accent)]"></div></div>
        ) : (
          <div className="glass-card !p-0 overflow-hidden">
            <DataTable 
              data={ordersData || []}
              columns={[
                { accessorKey: '_id', header: 'Reference', cell: info => <span className="text-[var(--admin-accent)] font-bold tracking-[0.2em] text-[10px] ml-4">#{info.getValue().slice(-8).toUpperCase()}</span> },
                { accessorKey: 'userId.name', header: 'Client', cell: info => (
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[var(--admin-text-primary)]/[0.05] border border-[var(--admin-panel-border)] flex items-center justify-center">
                            <span className="text-[9px] text-[var(--admin-text-secondary)]">{info.getValue()?.charAt(0) || 'G'}</span>
                        </div>
                        <span className="text-[var(--admin-text-primary)] font-medium text-[11px]">{info.getValue() || 'Guest Identity'}</span>
                    </div>
                )},
                { accessorKey: 'items[0].productName', header: 'Item', cell: info => <span className="text-[var(--admin-text-secondary)] text-[11px] italic">{info.getValue() || 'Velvora Selection'}</span> },
                { accessorKey: 'totalAmount', header: 'Value', cell: info => <span className="text-[var(--admin-text-primary)] font-bold text-[11px]">${info.getValue()?.toLocaleString()}</span> },
                { accessorKey: 'status', header: 'Fulfillment', cell: info => (
                    <select 
                      defaultValue={info.getValue()}
                      onChange={(e) => updateOrderStatus.mutate({ orderId: info.row.original._id, status: e.target.value })}
                      className="bg-transparent border border-[var(--admin-panel-border)] rounded-lg px-3 py-1.5 text-[9px] font-bold uppercase text-[var(--admin-accent)] outline-none hover:bg-[var(--admin-text-primary)]/[0.05] transition-colors"
                    >
                      <option value="Processing" className="bg-[var(--admin-panel)] text-[var(--admin-text-primary)]">Processing</option>
                      <option value="Shipped" className="bg-[var(--admin-panel)] text-[var(--admin-text-primary)]">Shipped</option>
                      <option value="Delivered" className="bg-[var(--admin-panel)] text-[var(--admin-text-primary)]">Delivered</option>
                      <option value="Cancelled" className="bg-[var(--admin-panel)] text-[var(--admin-text-primary)]">Cancelled</option>
                    </select>
                )},
                { accessorKey: 'createdAt', header: 'Timestamp', cell: info => <span className="text-[var(--admin-text-secondary)] text-[10px] font-bold uppercase pr-4">{formatDate(info.getValue())}</span> }
              ]}
            />
          </div>
        )
      ) : (
        isPaymentsLoading ? (
            <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[var(--admin-accent)]"></div></div>
        ) : (
          <div className="glass-card !p-0 overflow-hidden">
            <DataTable 
                data={paymentsData || []}
                columns={[
                { accessorKey: 'transaction_id', header: 'TXN UUID', cell: i => <span className="text-[var(--admin-accent)] font-mono text-[10px] tracking-wider ml-4">{i.getValue() || 'INT-VAULT'}</span> },
                { accessorKey: 'order_id._id', header: 'Order Ref', cell: i => <span className="text-[var(--admin-text-primary)] font-bold text-[10px]">#{i.getValue()?.slice(-8).toUpperCase() || 'EXTERNAL'}</span> },
                { accessorKey: 'amount', header: 'Value', cell: i => <span className="text-[var(--admin-text-primary)] font-bold text-[11px]">${i.getValue()?.toLocaleString()}</span> },
                { accessorKey: 'payment_mode', header: 'Protocol', cell: i => (
                    <span className="px-4 py-1 bg-[var(--admin-text-primary)]/[0.05] border border-[var(--admin-panel-border)] rounded-lg text-[9px] font-bold text-[var(--admin-text-secondary)] uppercase tracking-widest">{i.getValue()}</span>
                )},
                { accessorKey: 'payment_date', header: 'Timestamp', cell: i => <span className="text-[var(--admin-text-secondary)] text-[10px] font-bold uppercase pr-4">{formatDate(i.getValue())}</span> }
                ]}
            />
          </div>
        )
      )}
    </div>
  );
};

export default AdminOperations;
