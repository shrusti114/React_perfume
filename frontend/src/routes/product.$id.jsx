import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import Breadcrumb from '../components/common/navigation/Breadcrumb';
import { useProductDetailLogic } from '../features/products/hooks/useProductDetailLogic';
import { ProductImageGallery } from '../features/products/components/ProductImageGallery';
import { ProductInfo } from '../features/products/components/ProductInfo';

const ProductDetails = () => {
  const { id } = Route.useParams();
  const {
    product,
    isLoading,
    quantity,
    incrementQuantity,
    decrementQuantity,
    handleAddToCart,
    handleToggleWishlist,
    isWishlisted
  } = useProductDetailLogic(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#f8c8dc] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Essence is preparing...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black uppercase tracking-widest text-sm font-bold text-neutral-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen text-neutral-800 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-24 lg:px-12">
        
        <Breadcrumb 
          items={[
            { label: 'Home', path: '/' },
            { label: 'Perfumes', path: '/shop' },
            { label: product.family, path: '/shop' },
            { label: product.name, path: '#' }
          ]} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <ProductImageGallery 
            product={product} 
            isWishlisted={isWishlisted}
            onToggleWishlist={handleToggleWishlist}
          />

          <ProductInfo 
            product={product}
            quantity={quantity}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/product/$id')({
  component: ProductDetails,
});
