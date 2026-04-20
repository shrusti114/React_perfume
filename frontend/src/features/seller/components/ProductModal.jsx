import React, { useState, useEffect } from 'react';
import { X, Save, Package, Image as ImageIcon, IndianRupee, Tag, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreateProduct, useUpdateProduct } from '../../../hooks/useApi';
import { toast } from 'sonner';

/**
 * Combined Modal for Adding or Editing products
 */
export function ProductModal({ isOpen, onClose, product = null }) {
  const isEdit = !!product;
  const { mutate: createProduct, isLoading: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();

  const [formData, setFormData] = useState({
    name: '',
    brand: 'Velvora',
    price: '',
    description: '',
    image: '',
    family: 'Floral',
    stock: 10,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        brand: product.brand || 'Velvora',
        price: product.price || '',
        description: product.description || '',
        image: product.image || '',
        family: product.family || 'Floral',
        stock: product.stock || 10,
      });
    } else {
      setFormData({
        name: '',
        brand: 'Velvora',
        price: '',
        description: '',
        image: '',
        family: 'Floral',
        stock: 10,
      });
    }
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      updateProduct(
        { id: product._id, values: formData },
        {
          onSuccess: () => {
            toast.success('Product updated successfully');
            onClose();
          },
          onError: (err) => {
            toast.error(err?.response?.data?.message || 'Update failed');
          }
        }
      );
    } else {
      createProduct(formData, {
        onSuccess: () => {
          toast.success('Product saved successfully');
          onClose();
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || 'Save failed');
        }
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white dark:bg-[#0a0a0a] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-black/5 dark:border-white/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5 bg-neutral-50 dark:bg-neutral-900/50">
              <div>
                <h2 className="text-xl font-serif text-black dark:text-white">
                  {isEdit ? 'Edit Scent' : 'Add New Fragrance'}
                </h2>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mt-1">
                  {isEdit ? 'Update product details' : 'List your creation'}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-neutral-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 flex items-center gap-2">
                    <Tag size={12} /> Product Name
                  </label>
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#f8c8dc] outline-none transition-all placeholder:text-neutral-400"
                    placeholder="e.g. Midnight Oud"
                  />
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 flex items-center gap-2">
                      <IndianRupee size={12} /> Price
                    </label>
                    <input 
                      required
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full bg-neutral-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#f8c8dc] outline-none transition-all"
                      placeholder="Amount in ₹"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 flex items-center gap-2">
                      <Package size={12} /> Stock
                    </label>
                    <input 
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full bg-neutral-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#f8c8dc] outline-none transition-all"
                      placeholder="Qty"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 flex items-center gap-2">
                    <FileText size={12} /> Description
                  </label>
                  <textarea 
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-neutral-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#f8c8dc] outline-none transition-all resize-none"
                    placeholder="Describe the scent profile..."
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 flex items-center gap-2">
                    <ImageIcon size={12} /> Image URL
                  </label>
                  <input 
                    required
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#f8c8dc] outline-none transition-all"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="p-6 border-t border-black/5 dark:border-white/5 bg-neutral-50 dark:bg-neutral-900/50 flex gap-3">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl border border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-neutral-100 dark:hover:bg-white/5 transition-all text-neutral-600 dark:text-white"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isCreating || isUpdating}
                className="flex-1 py-3 px-4 rounded-xl bg-black dark:bg-[#f8c8dc] text-white dark:text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <Save size={14} className="group-hover:scale-110 transition-transform" />
                {isCreating || isUpdating ? 'Saving...' : (isEdit ? 'Save Changes' : 'List Product')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
