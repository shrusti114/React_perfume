import React, { useState } from 'react';
import { 
  Plus, Search, ShoppingBag, Trash2, Edit, Sparkles 
} from 'lucide-react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Modal } from '../../ui/Modal';
import { Textarea } from '../../ui/Textarea';

const AdminInventory = ({ 
  productsData, categoriesData, isProductsLoading, 
  createProduct, updateProductMutation, deleteProductMutation,
  createCategoryMutation, deleteCategory, updateCategory
}) => {
  const [productSearch, setProductSearch] = useState('');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  return (
    <div className="space-y-12 pb-20 animate-in slide-in-from-bottom duration-700">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl font-bold text-[var(--admin-text-primary)] tracking-wider uppercase opacity-90">Inventory Registry</h3>
            <p className="text-[9px] text-[var(--admin-text-secondary)] font-bold uppercase tracking-[0.2em] mt-2">Oversee {productsData?.length || 0} unique olfactory creations</p>
          </div>
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <div className="relative group flex-1 md:flex-initial">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--admin-text-secondary)] group-focus-within:text-[var(--admin-accent)] transition-colors" size={12} />
                  <input 
                    placeholder="Search inventory..." 
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full md:w-80 glass-panel rounded-xl px-12 py-3 text-[11px] outline-none focus:border-[var(--admin-accent)]/40 text-[var(--admin-text-primary)]" 
                  />
              </div>
              <Button 
                onClick={() => setIsAddProductModalOpen(true)}
                className="bg-[var(--admin-accent)] text-black h-12 px-8 rounded-xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-[var(--admin-accent)]/10"
              >
                  <Plus size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">New Fragrance</span>
              </Button>
              <Button 
                onClick={() => setIsAddCategoryModalOpen(true)}
                className="glass-panel text-[var(--admin-text-primary)] h-12 px-8 rounded-xl flex items-center gap-3 hover:bg-[var(--admin-accent)] hover:text-black transition-all"
              >
                  <Sparkles size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Add Category</span>
              </Button>
          </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <section className="space-y-6">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--admin-text-secondary)] ml-2">Collection Pillars</h4>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categoriesData?.map((cat) => (
            <div key={cat._id} className="glass-panel shrink-0 min-w-[200px] p-6 flex flex-col items-center group relative overflow-hidden rounded-[1.5rem] hover:border-[var(--admin-accent)]/30 transition-all">
                <div className="h-16 w-16 bg-[var(--admin-accent)]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden border border-white/5">
                    {cat.image ? (
                        <img src={cat.image} alt={cat.category_name} className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <Sparkles size={18} className="text-[var(--admin-accent)]" />
                    )}
                </div>
                <h4 className="text-[var(--admin-text-primary)] font-bold text-[11px] tracking-wider uppercase mb-1">{cat.category_name}</h4>
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => setEditingCategory(cat)} 
                      className="p-1.5 rounded-lg bg-white/5 text-[var(--admin-text-secondary)] hover:text-[var(--admin-accent)] transition-all"
                    >
                      <Edit size={12} />
                    </button>
                    <button 
                      onClick={() => { if(window.confirm(`Delete ${cat.category_name}?`)) deleteCategory.mutate(cat._id); }} 
                      className="p-1.5 rounded-lg bg-white/5 text-[var(--admin-text-secondary)] hover:text-rose-500 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      {isProductsLoading ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[var(--admin-accent)]"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productsData?.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase())).map((p) => (
            <div key={p._id} className="glass-card group hover:border-[var(--admin-accent)]/30 transition-all relative overflow-hidden flex flex-col h-full">
                <div className="h-48 bg-[var(--admin-text-primary)]/[0.05] rounded-[1.5rem] overflow-hidden relative shadow-2xl mb-6 shrink-0 border border-[var(--admin-panel-border)]">
                    {p.image ? (
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <ShoppingBag size={40} className="text-[var(--admin-text-primary)]" />
                        </div>
                    )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="text-[var(--admin-text-primary)] font-bold text-lg mb-1 tracking-tight truncate">{p.name}</h5>
                      <p className="text-[9px] text-[var(--admin-text-secondary)] font-bold uppercase tracking-widest mb-4">{p.categoryId?.category_name || 'Fragrance'}</p>
                      <div className="space-y-2">
                          <p className="text-[10px] text-[var(--admin-text-secondary)] font-bold uppercase tracking-widest flex justify-between">Price <span className="text-[var(--admin-accent)] font-bold">${p.price}</span></p>
                          <p className="text-[10px] text-[var(--admin-text-secondary)] font-bold uppercase tracking-widest flex justify-between">Stock <span className={`${p.stock < 10 ? 'text-rose-500' : 'text-[var(--admin-text-primary)]'}`}>{p.stock} units</span></p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                        <button 
                          onClick={() => setEditingProduct(p)}
                          className="flex-1 h-10 glass-panel border-[var(--admin-accent)]/20 text-[var(--admin-accent)] font-bold text-[9px] rounded-xl uppercase tracking-widest hover:bg-[var(--admin-accent)] hover:text-black transition-all"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => { if(window.confirm(`Vanish ${p.name}?`)) deleteProductMutation.mutate(p._id); }}
                          className="h-10 px-4 glass-panel border-rose-500/20 text-rose-500 font-bold text-[9px] rounded-xl hover:bg-rose-500 hover:text-white transition-all text-center flex items-center justify-center"
                        >
                            <Trash2 size={14}/>
                        </button>
                    </div>
                </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Modal */}
      <Modal 
        isOpen={isAddProductModalOpen || !!editingProduct} 
        onClose={() => { setIsAddProductModalOpen(false); setEditingProduct(null); }}
        title={editingProduct ? "Refine Fragrance" : "New Olfactory Creation"}
      >
        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
          if(editingProduct) {
            updateProductMutation.mutate({ id: editingProduct._id, values: data }, { onSuccess: () => setEditingProduct(null) });
          } else {
            createProduct.mutate(data, { onSuccess: () => setIsAddProductModalOpen(false) });
          }
        }}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Name</label>
              <Input name="name" defaultValue={editingProduct?.name} className="glass-panel" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Price ($)</label>
              <Input name="price" type="number" defaultValue={editingProduct?.price} className="glass-panel" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Inventory Units</label>
                <Input name="stock" type="number" defaultValue={editingProduct?.stock} className="glass-panel" required />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Image URL</label>
                <Input name="image" defaultValue={editingProduct?.image} className="glass-panel" placeholder="https://images.unsplash.com/..." />
            </div>
          </div>
          <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Description</label>
              <Textarea name="description" defaultValue={editingProduct?.description} className="glass-panel h-32" required />
          </div>
          <div className="flex justify-end gap-4 pt-6">
              <Button type="submit" className="px-10 bg-[var(--admin-accent)] text-black font-bold">
                {editingProduct ? "Update Asset" : "Deploy Asset"}
              </Button>
          </div>
        </form>
      </Modal>

      {/* Category Modal */}
      <Modal 
        isOpen={isAddCategoryModalOpen || !!editingCategory} 
        onClose={() => { setIsAddCategoryModalOpen(false); setEditingCategory(null); }}
        title={editingCategory ? "Refine Scent Library" : "Expand Scent Library"}
      >
        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const name = formData.get('name');
          const description = formData.get('description');
          const image = formData.get('image');
          
          if(editingCategory) {
            updateCategory.mutate({ 
              id: editingCategory._id, 
              values: { category_name: name, description, image } 
            }, { onSuccess: () => setEditingCategory(null) });
          } else {
            createCategoryMutation.mutate({ name, description, image }, { onSuccess: () => setIsAddCategoryModalOpen(false) });
          }
        }}>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Category Name</label>
            <Input name="name" defaultValue={editingCategory?.category_name} className="glass-panel" required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Image URL</label>
            <Input name="image" defaultValue={editingCategory?.image} className="glass-panel" placeholder="https://images.unsplash.com/..." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Description</label>
            <Textarea name="description" defaultValue={editingCategory?.description} className="glass-panel h-24" />
          </div>
          <div className="flex justify-end gap-4 pt-6">
              <Button type="submit" className="px-10 bg-[var(--admin-accent)] text-black font-bold">
                {editingCategory ? "Update Essence" : "Archive Category"}
              </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminInventory;
