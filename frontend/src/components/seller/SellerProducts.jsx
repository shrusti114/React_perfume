import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { productSchema } from '../../utils/validationSchemas';
import { Plus, Edit, Trash2, X, Package, DollarSign, Tag, FileText, Image as ImageIcon } from 'lucide-react';

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/api/products/seller', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this perfume?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchProducts();
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

  const handleModalSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = localStorage.getItem('token');
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, values, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/products', values, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      resetForm();
      setShowModal(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || 'Action failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div></div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-elegant text-neutral-800">Your Collection</h2>
        <button 
          onClick={() => { setEditingProduct(null); setShowModal(true); }}
          className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-pink-500 transition-all flex items-center gap-2 shadow-xl hover:-translate-y-1"
        >
          <Plus size={20} /> Add New Fragrance
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-sm flex gap-6 hover:shadow-xl transition-all duration-300">
            <div className="w-32 h-40 rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-100">
              <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500 mb-1 block">{product.category || 'General'}</span>
                  <h3 className="text-2xl font-elegant text-neutral-800">{product.name}</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingProduct(product); setShowModal(true); }} className="p-3 text-neutral-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="p-3 text-neutral-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-neutral-500 text-sm font-light line-clamp-2 mb-4 leading-relaxed">{product.description}</p>
              <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4">
                <span className="text-2xl font-semibold text-neutral-800">${product.price.toFixed(2)}</span>
                <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 sm:p-12">
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-10 py-8 bg-[#fafafa] border-b border-neutral-100 flex justify-between items-center">
              <h3 className="text-3xl font-elegant text-neutral-800">{editingProduct ? 'Edit Essence' : 'New Creation'}</h3>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-black transition-colors">
                <X size={24} />
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
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 px-1">Fragrance Name</label>
                      <div className="relative group">
                        <Package size={18} className="absolute left-4 top-4 text-neutral-300 group-focus-within:text-pink-400 transition-colors" />
                        <Field name="name" className="w-full bg-neutral-50 border border-neutral-100 pl-12 pr-4 py-4 rounded-2xl focus:ring-1 focus:ring-pink-300 focus:bg-white transition-all outline-none" placeholder="E.g. Velvet Musk" />
                      </div>
                      <ErrorMessage name="name" component="div" className="text-rose-500 text-[10px] font-bold uppercase ml-1" />
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 px-1">Price (USD)</label>
                      <div className="relative group">
                        <DollarSign size={18} className="absolute left-4 top-4 text-neutral-300 group-focus-within:text-pink-400 transition-colors" />
                        <Field name="price" type="number" className="w-full bg-neutral-50 border border-neutral-100 pl-12 pr-4 py-4 rounded-2xl focus:ring-1 focus:ring-pink-300 focus:bg-white transition-all outline-none" placeholder="125.00" />
                      </div>
                      <ErrorMessage name="price" component="div" className="text-rose-500 text-[10px] font-bold uppercase ml-1" />
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 px-1">Category</label>
                      <div className="relative group">
                        <Tag size={18} className="absolute left-4 top-4 text-neutral-300 group-focus-within:text-pink-400 transition-colors" />
                        <Field as="select" name="category" className="w-full bg-neutral-50 border border-neutral-100 pl-12 pr-10 py-4 rounded-2xl focus:ring-1 focus:ring-pink-300 focus:bg-white transition-all outline-none appearance-none">
                          <option value="">Select Category</option>
                          <option value="floral">Floral</option>
                          <option value="oriental">Oriental</option>
                          <option value="woody">Woody</option>
                          <option value="fresh">Fresh</option>
                        </Field>
                      </div>
                      <ErrorMessage name="category" component="div" className="text-rose-500 text-[10px] font-bold uppercase ml-1" />
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 px-1">Initial Stock</label>
                      <div className="relative group">
                        <Package size={18} className="absolute left-4 top-4 text-neutral-300 group-focus-within:text-pink-400 transition-colors" />
                        <Field name="stock" type="number" className="w-full bg-neutral-50 border border-neutral-100 pl-12 pr-4 py-4 rounded-2xl focus:ring-1 focus:ring-pink-300 focus:bg-white transition-all outline-none" placeholder="50" />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 px-1">Product Description</label>
                      <div className="relative group">
                        <FileText size={18} className="absolute left-4 top-4 text-neutral-300 group-focus-within:text-pink-400 transition-colors" />
                        <Field as="textarea" name="description" rows="3" className="w-full bg-neutral-50 border border-neutral-100 pl-12 pr-4 py-4 rounded-2xl focus:ring-1 focus:ring-pink-300 focus:bg-white transition-all outline-none resize-none" placeholder="Composition, heart notes, and base notes..." />
                      </div>
                      <ErrorMessage name="description" component="div" className="text-rose-500 text-[10px] font-bold uppercase ml-1" />
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 px-1">Visual URL</label>
                      <div className="relative group">
                        <ImageIcon size={18} className="absolute left-4 top-4 text-neutral-300 group-focus-within:text-pink-400 transition-colors" />
                        <Field name="image" className="w-full bg-neutral-50 border border-neutral-100 pl-12 pr-4 py-4 rounded-2xl focus:ring-1 focus:ring-pink-300 focus:bg-white transition-all outline-none" placeholder="https://images.unsplash.com/..." />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-100">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-black text-white py-5 rounded-3xl font-bold uppercase tracking-widest hover:bg-pink-500 transition-all shadow-xl disabled:bg-neutral-300 transform hover:scale-[1.01]"
                    >
                      {isSubmitting ? 'Syncing...' : (editingProduct ? 'Update Essence' : 'Release Fragrance')}
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
