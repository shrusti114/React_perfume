import React, { useState } from "react";
import { Plus } from "lucide-react";
import { DataTable } from "../../../components/ui/DataTable";
import { getProductColumns } from "./ProductColumns";
import { ProductFormModal } from "./ProductFormModal";
import { useProducts, useDeleteProduct, useUpdateProduct, useCreateProduct } from "../../../hooks/useApi";

/**
 * Main Admin Product Table feature.
 */
export function AdminProductTable() {
  const { data: products = [], isLoading } = useProducts();
  const deleteMutation = useDeleteProduct();
  const updateMutation = useUpdateProduct();
  const createMutation = useCreateProduct();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (values) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct._id, values });
    } else {
      createMutation.mutate(values);
    }
    setIsModalOpen(false);
  };

  const columns = getProductColumns(handleEdit, handleDelete);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-foreground">Manage Products</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-all shadow-lg"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={products} 
        onRowClick={(row) => console.log("Row clicked:", row)}
      />

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingProduct || undefined}
      />
    </div>
  );
}
