import React from "react";
import { Edit, Trash2, Eye } from "lucide-react";

/**
 * Columns definition for the Admin Product Table.
 */
export const getProductColumns = (onEdit, onDelete) => [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden">
        <img
          src={row.original.image}
          alt={row.original.name}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-bold text-foreground">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>₹{row.original.price.toLocaleString()}</span>,
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(row.original);
          }}
          className="p-1.5 rounded-md hover:bg-primary/10 text-primary transition-colors"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(row.original._id);
          }}
          className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
];
