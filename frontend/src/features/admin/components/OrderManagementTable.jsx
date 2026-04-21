import React from 'react';
import { 
  createColumnHelper, 
  flexRender, 
  getCoreRowModel, 
  useReactTable, 
  getSortedRowModel,
  getPaginationRowModel
} from '@tanstack/react-table';
import { MoreHorizontal, ExternalLink, Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

const columnHelper = createColumnHelper();

const statusIcon = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle
};

const statusColor = {
  pending: 'bg-amber-500/10 text-amber-500',
  processing: 'bg-blue-500/10 text-blue-500',
  shipped: 'bg-indigo-500/10 text-indigo-500',
  delivered: 'bg-green-500/10 text-green-500',
  cancelled: 'bg-red-500/10 text-red-500'
};

export function OrderManagementTable({ orders, onUpdateStatus }) {
  const columns = [
    columnHelper.accessor('id', {
      header: 'Order ID',
      cell: info => <span className="font-mono text-[10px] text-neutral-400">#{info.getValue().slice(-8)}</span>,
    }),
    columnHelper.accessor('userId.name', {
      header: 'Customer',
      cell: info => (
        <div className="flex flex-col">
          <span className="font-bold text-sm">{info.getValue() || 'Guest'}</span>
          <span className="text-[10px] text-neutral-500">{info.row.original.userId?.email || info.row.original.guestInfo?.email || 'N/A'}</span>
        </div>
      ),
    }),
    columnHelper.accessor('totalAmount', {
      header: 'Total',
      cell: info => <span className="font-bold">₹{info.getValue().toLocaleString()}</span>,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        const Icon = statusIcon[status] || Clock;
        return (
          <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest", statusColor[status])}>
            <Icon size={12} />
            {status}
          </div>
        );
      },
    }),
    columnHelper.accessor('createdAt', {
      header: 'Date',
      cell: info => <span className="text-neutral-500 text-sm">{new Date(info.getValue()).toLocaleDateString()}</span>,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: info => (
        <div className="flex items-center gap-2">
          <select 
            value={info.row.original.status}
            onChange={(e) => onUpdateStatus(info.row.original.id, e.target.value)}
            className="bg-neutral-50 dark:bg-black border border-black/5 dark:border-white/10 rounded-lg text-[10px] px-2 py-1 outline-none focus:border-[#f8c8dc]"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="p-2 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-lg transition-colors text-neutral-400 hover:text-black dark:hover:text-white">
            <ExternalLink size={14} />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: orders || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-white dark:bg-white/5 rounded-[2rem] border border-black/5 dark:border-white/10 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-black/5 dark:border-white/10 bg-neutral-50/50 dark:bg-white/5">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-black/5 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors group">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-6 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination dummy */}
      <div className="p-6 flex justify-between items-center bg-neutral-50/30 dark:bg-black/20 border-t border-black/5 dark:border-white/5">
        <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">
          Page 1 of 1
        </span>
        <div className="flex gap-2">
          <button disabled className="px-4 py-2 rounded-xl border border-black/5 dark:border-white/10 text-xs font-bold disabled:opacity-30">Prev</button>
          <button disabled className="px-4 py-2 rounded-xl border border-black/5 dark:border-white/10 text-xs font-bold disabled:opacity-30">Next</button>
        </div>
      </div>
    </div>
  );
}
