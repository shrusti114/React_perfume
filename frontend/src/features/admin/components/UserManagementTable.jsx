import React from 'react';
import { 
  createColumnHelper, 
  flexRender, 
  getCoreRowModel, 
  useReactTable, 
} from '@tanstack/react-table';
import { Shield, User as UserIcon, Mail, Ban, Unlock, MoreVertical } from 'lucide-react';
import { cn } from '../../../utils/cn';

const columnHelper = createColumnHelper();

export function UserManagementTable({ users, onToggleBlock }) {
  const columns = [
    columnHelper.accessor('name', {
      header: 'User Details',
      cell: info => (
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-[#f8c8dc]/20 rounded-full flex items-center justify-center text-[#f8c8dc]">
            <UserIcon size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-black dark:text-white">{info.getValue()}</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">{info.row.original.role}</span>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('email', {
      header: 'Email Address',
      cell: info => (
        <div className="flex items-center gap-2 text-neutral-500">
          <Mail size={14} className="opacity-50" />
          <span className="text-sm">{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('isVerified', {
      header: 'Status',
      cell: info => (
        <div className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
          info.getValue() ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"
        )}>
          {info.getValue() ? "Verified" : "Pending"}
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: info => {
        const isBlocked = info.row.original.isBlocked;
        return (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleBlock(info.row.original.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                isBlocked 
                  ? "bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white"
                  : "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
              )}
            >
              {isBlocked ? <Unlock size={12} /> : <Ban size={12} />}
              {isBlocked ? "Unblock" : "Block User"}
            </button>
            <button className="p-2 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-lg transition-colors text-neutral-400">
              <MoreVertical size={14} />
            </button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: users || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
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
              <tr key={row.id} className="border-b border-black/5 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors">
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
    </div>
  );
}
