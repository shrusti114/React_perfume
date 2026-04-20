/**
 * Utility functions for product data formatting.
 */

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const getFragranceIntensity = (concentration) => {
  const intensities = {
    'EDP': 'Long-lasting',
    'EDT': 'Moderate',
    'Parfum': 'Extraordinary',
    'Cologne': 'Fresh & Light'
  };
  return intensities[concentration] || 'Luxurious';
};

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};
