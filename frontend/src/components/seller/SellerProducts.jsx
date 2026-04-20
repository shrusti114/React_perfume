import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { productSchema } from '../../utils/validationSchemas';
import { Plus, Edit, Trash2, X, Package, DollarSign, Tag, FileText, Image as ImageIcon } from 'lucide-react';
import { useSellerProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/useApi';

const SellerProducts = () => {
  const { data: productsData, isLoading: loading } = useSellerProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const products = productsData || [];
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this essence?')) {
      deleteProduct.mutate(id);
    }
  };

  const handleModalSubmit = (values, { setSubmitting, resetForm }) => {
    if (editingProduct) {
      updateProduct.mutate(
        { id: editingProduct._id, values },
        { 
          onSuccess: () => {
            resetForm();
            setShowModal(false);
            setEditingProduct(null);
            setSubmitting(false);
          },
          onError: (err) => {
             alert(err.response?.data?.message || 'Update failed');
             setSubmitting(false);
          }
        }
      );
    } else {
      createProduct.mutate(values, {
        onSuccess: () => {
          resetForm();
          setShowModal(false);
          setSubmitting(false);
        },
        onError: (err) => {
          alert(err.response?.data?.message || 'Creation failed');
          setSubmitting(false);
        }
      });
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#D9A0A0] dark:border-[#00D4FF]"></div></div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-[15px] font-bold text-neutral-800 dark:text-white tracking-wider uppercase opacity-90">Aromatic Collection</h2>
        <button 
          onClick={() => { setEditingProduct(null); setShowModal(true); }}
          className="bg-[#D9A0A0] dark:bg-[#00D4FF] text-white dark:text-black px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#E5B5B5] dark:hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-[0_4px_15px_rgba(217,160,160,0.3)] dark:shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:-translate-y-0.5"
        >
          <Plus size={16} /> New Asset
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white dark:bg-[#202231] rounded-[2.5rem] p-6 border border-[#D9A0A0]/10 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-xl flex gap-8 hover:shadow-[0_8px_30px_rgba(217,160,160,0.15)] dark:hover:shadow-[0_8px_30px_rgba(0,212,255,0.15)] hover:border-[#D9A0A0]/30 dark:hover:border-[#00D4FF]/30 transition-all duration-300">
            <div className="w-32 h-40 rounded-[1.5rem] overflow-hidden bg-[#FAFAFA] dark:bg-[#1a1c27] flex-shrink-0 border border-[#D9A0A0]/10 dark:border-white/5 relative shadow-inner">
              <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
            </div>
            <div className="flex-grow flex flex-col pt-2">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D9A0A0] dark:text-[#00D4FF] mb-1 block">{product.category?.name || product.family || 'General'}</span>
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-white tracking-wide">{product.name}</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingProduct(product); setShowModal(true); }} className="p-3 bg-white dark:bg-[#2a2d3e] text-neutral-400 dark:text-gray-400 hover:text-[#D9A0A0] dark:hover:text-[#00D4FF] hover:bg-[#F5E6E6] dark:hover:bg-[#00D4FF]/10 rounded-xl transition-all border border-[#D9A0A0]/10 dark:border-white/5 shadow-sm">
                    <Edit size={14} />
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="p-3 bg-white dark:bg-[#2a2d3e] text-neutral-400 dark:text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all border border-[#D9A0A0]/10 dark:border-white/5 shadow-sm">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-neutral-500 dark:text-gray-400 text-[11px] font-medium line-clamp-2 leading-relaxed mb-4">{product.description}</p>
              <div className="mt-auto flex items-center justify-between border-t border-[#D9A0A0]/10 dark:border-white/5 pt-4">
                <span className="text-lg font-bold text-[#D9A0A0] dark:text-[#00D4FF] tracking-wide">${product.price.toFixed(2)}</span>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border ${product.stock > 0 ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400'}`}>
                  {product.stock > 0 ? `${product.stock} Units` : 'Depleted'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 sm:p-12">
          <div className="absolute inset-0 bg-[#FAFAFA]/80 dark:bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white dark:bg-[#202231] rounded-[3rem] border border-[#D9A0A0]/20 dark:border-white/10 shadow-[0_20px_50px_rgba(217,160,160,0.15)] dark:shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-10 py-8 bg-[#FAFAFA] dark:bg-[#1a1c27] border-b border-[#D9A0A0]/10 dark:border-white/5 flex justify-between items-center">
              <h3 className="text-[15px] font-bold text-neutral-800 dark:text-white tracking-wider uppercase opacity-90">{editingProduct ? 'Refine Essence' : 'Synthesize Asset'}</h3>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 dark:text-gray-500 hover:text-rose-400 dark:hover:text-rose-400 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <Formik
              initialValues={{
                name: editingProduct?.name || '',
                price: editingProduct?.price || '',
                description: editingProduct?.description || '',
                category: editingProduct?.category || '',
                image: editingProduct?.image || '',
                stock: editingProduct?.stock || 0
              }}
              validationSchema={productSchema}
              onSubmit={handleModalSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="p-10 space-y-8 overflow-y-auto max-h-[70vh]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500 px-1">Fragrance Name</label>
                      <div className="relative group">
                        <Package size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
                        <Field name="name" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 pl-14 pr-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 transition-all outline-none text-neutral-800 dark:text-white text-[11px] shadow-sm" placeholder="E.g. Velvet Musk" />
                      </div>
                      <ErrorMessage name="name" component="div" className="text-rose-500 text-[9px] font-bold uppercase tracking-widest ml-2" />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500 px-1">Price (USD)</label>
                      <div className="relative group">
                        <DollarSign size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
                        <Field name="price" type="number" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 pl-14 pr-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 transition-all outline-none text-neutral-800 dark:text-white text-[11px] shadow-sm" placeholder="125.00" />
                      </div>
                      <ErrorMessage name="price" component="div" className="text-rose-500 text-[9px] font-bold uppercase tracking-widest ml-2" />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500 px-1">Category</label>
                      <div className="relative group">
                        <Tag size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
                        <Field as="select" name="category" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 pl-14 pr-10 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 transition-all outline-none appearance-none text-neutral-800 dark:text-white text-[11px] shadow-sm cursor-pointer">
                          <option value="">Select Category</option>
                          <option value="floral">Floral</option>
                          <option value="oriental">Oriental</option>
                          <option value="woody">Woody</option>
                          <option value="fresh">Fresh</option>
                        </Field>
                      </div>
                      <ErrorMessage name="category" component="div" className="text-rose-500 text-[9px] font-bold uppercase tracking-widest ml-2" />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500 px-1">Initial Stock</label>
                      <div className="relative group">
                        <Package size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
                        <Field name="stock" type="number" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 pl-14 pr-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 transition-all outline-none text-neutral-800 dark:text-white text-[11px] shadow-sm" placeholder="50" />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500 px-1">Detailed Description</label>
                      <div className="relative group flex items-start">
                        <FileText size={16} className="absolute left-5 top-5 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
                        <Field as="textarea" name="description" rows="3" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 pl-14 pr-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 transition-all outline-none resize-none text-neutral-800 dark:text-white text-[11px] shadow-sm" placeholder="Composition, heart notes, and base notes..." />
                      </div>
                      <ErrorMessage name="description" component="div" className="text-rose-500 text-[9px] font-bold uppercase tracking-widest ml-2" />
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500 px-1">Visual Asset URL</label>
                      <div className="relative group">
                        <ImageIcon size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
                        <Field name="image" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 pl-14 pr-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 transition-all outline-none text-neutral-800 dark:text-white text-[11px] shadow-sm" placeholder="https://..." />
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-[#D9A0A0]/10 dark:border-white/5 flex gap-4">
                    <button type="button" onClick={() => setShowModal(false)} className="w-1/3 bg-white dark:bg-[#1a1c27] border border-[#D9A0A0]/20 dark:border-white/10 text-neutral-500 dark:text-gray-400 py-4 rounded-2xl font-bold uppercase tracking-widest text-[9px] hover:bg-[#FAFAFA] dark:hover:bg-white/5 hover:text-neutral-800 dark:hover:text-white transition-all shadow-sm">Cancel</button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-2/3 bg-[#D9A0A0] dark:bg-[#00D4FF] text-white dark:text-black py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#E5B5B5] dark:hover:bg-cyan-300 transition-all shadow-[0_4px_15px_rgba(217,160,160,0.3)] dark:shadow-[0_0_15px_rgba(0,212,255,0.4)] disabled:bg-[#D9A0A0]/50 dark:disabled:bg-[#00D4FF]/50"
                    >
                      {isSubmitting ? 'Syncing...' : (editingProduct ? 'Commit Changes' : 'Deploy Asset')}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
