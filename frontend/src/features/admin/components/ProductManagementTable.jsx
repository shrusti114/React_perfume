import React, { useState } from "react";
import { Plus, Package } from "lucide-react";
import { DataTable } from "../../../components/ui/DataTable";
import { getProductColumns } from "./ProductColumns";
import { ProductFormModal } from "./ProductFormModal";

/**
 * Generic Product Table for both Admin and Seller.
 */
export function ProductManagementTable({ 
  products = [], 
  isLoading, 
  onDelete, 
  onUpdate, 
  onCreate,
  title = "Manage Products" 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this fragrance?")) {
      onDelete(id);
    }
  };

  const handleSubmit = (values) => {
    if (editingProduct) {
      onUpdate({ id: editingProduct._id, values });
    } else {
      onCreate(values);
    }
    setIsModalOpen(false);
  };

  const columns = getProductColumns(handleEdit, handleDelete);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-10 h-10 border-4 border-[#f8c8dc] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Loading Inventory</span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white dark:bg-white/5 rounded-[2rem] border border-black/5 dark:border-white/10 p-20 text-center">
        <Package size={48} className="mx-auto text-[#f8c8dc] mb-6 opacity-30" />
        <h3 className="text-2xl font-serif text-black dark:text-white mb-2">No Fragrances Found</h3>
        <p className="text-neutral-500 text-xs uppercase tracking-widest font-bold mb-8">Begin your collection by adding your first scent.</p>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-black dark:bg-[#f8c8dc] text-white dark:text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:opacity-80 transition-all shadow-md"
        >
          Add First Product
        </button>
        <ProductFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialValues={editingProduct || undefined}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-white/5 rounded-[2rem] border border-black/5 dark:border-white/10 overflow-hidden shadow-sm">
        <DataTable 
          columns={columns} 
          data={products} 
          onRowClick={(row) => console.log("Row clicked:", row)}
        />
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingProduct || undefined}
      />
    </div>
  );
}
