/**
 * Velvora Perfume Database
 * 200 Brands × 10 Perfumes = 2,000 Products
 */

const perfumeImages = [
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600',
  'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600',
  'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600',
  'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=600',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=600',
  'https://images.unsplash.com/photo-1619994121345-b61cd610c5a6?q=80&w=600',
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=600',
  'https://images.unsplash.com/photo-1590156206657-aec7b3d87a57?q=80&w=600',
  'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=600',
  'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=600',
  'https://images.unsplash.com/photo-1528740096961-3798add15914?q=80&w=600',
];

const families = ['Floral', 'Woody', 'Fresh', 'Oriental', 'Luxury Collection'];
const genderCategories = ['For Men', 'For Women', 'Unisex'];

/* ── 200 Brands ─────────────────────── */
export const brands = [
  'Chanel', 'Dior', 'Tom Ford', 'Gucci', 'Yves Saint Laurent',
  'Versace', 'Prada', 'Burberry', 'Dolce & Gabbana', 'Armani',
  'Hermès', 'Givenchy', 'Valentino', 'Bvlgari', 'Cartier',
  'Lancôme', 'Calvin Klein', 'Hugo Boss', 'Ralph Lauren', 'Creed',
  'Jo Malone', 'Maison Margiela', 'Byredo', 'Le Labo', 'Diptyque',
  'Acqua di Parma', 'Montblanc', 'Issey Miyake', 'Narciso Rodriguez', 'Marc Jacobs',
  'Viktor & Rolf', 'Thierry Mugler', 'Jean Paul Gaultier', 'Carolina Herrera', 'Paco Rabanne',
  'Azzaro', 'Kenzo', 'Loewe', 'Balenciaga', 'Bottega Veneta',
  'Chloé', 'Fendi', 'Miu Miu', 'Salvatore Ferragamo', 'Tiffany & Co.',
  'Van Cleef & Arpels', 'Penhaligon\'s', 'Amouage', 'Clive Christian', 'Roja Parfums',
  'Xerjoff', 'Parfums de Marly', 'Initio', 'Nishane', 'Tiziana Terenzi',
  'Memo Paris', 'Atelier Cologne', 'Maison Francis Kurkdjian', 'Frederic Malle', 'Serge Lutens',
  'Aerin', 'Bond No. 9', 'Juliette Has a Gun', 'Clean Reserve', 'Philosophy',
  'Coach', 'Kate Spade', 'Michael Kors', 'Tommy Hilfiger', 'DKNY',
  'Estée Lauder', 'Clinique', 'Elizabeth Arden', 'Oscar de la Renta', 'Vera Wang',
  'Elie Saab', 'Marchesa', 'Escada', 'Roberto Cavalli', 'Moschino',
  'Dsquared2', 'Zadig & Voltaire', 'Mancera', 'Montale', 'Rasasi',
  'Swiss Arabian', 'Ajmal', 'Lattafa', 'Armaf', 'Al Haramain',
  'Afnan', 'Maison Alhambra', 'Fragrance World', 'Paris Corner', 'Orientica',
  'Asdaaf', 'Zimaya', 'Brandy Designs', 'Rio Perfumes', 'Sapil',
  'Jaguar', 'Bentley', 'Mercedes-Benz', 'Ferrari', 'Porsche Design',
  'Dunhill', 'Davidoff', 'Nautica', 'Lacoste', 'Abercrombie & Fitch',
  'Hollister', 'Bath & Body Works', 'Victoria\'s Secret', 'Sol de Janeiro', 'Ariana Grande',
  'Billie Eilish', 'Rihanna', 'Lady Gaga', 'Beyoncé', 'Nicki Minaj',
  'Sarah Jessica Parker', 'Jennifer Lopez', 'David Beckham', 'Cristiano Ronaldo', 'Antonio Banderas',
  'Dolly Parton', 'Tory Burch', 'Anna Sui', 'Lolita Lempicka', 'Boucheron',
  'Chopard', 'Lalique', 'Swarovski', 'Baccarat', 'Floris London',
  'Penhaligon\'s Heritage', 'Trudon', 'Cire Trudon', 'Ex Nihilo', 'Juneberry',
  'Kayali', 'Kilian', 'Parfums Dusita', 'Goldfield & Banks', 'Vilhelm Parfumerie',
  'Eight & Bob', 'Escentric Molecules', 'Gallivant', 'Heeley', 'Histoires de Parfums',
  'Imaginary Authors', 'Jeroboam', 'Jul et Mad', 'Kerosene', 'Laboratorio Olfattivo',
  'Maria Candida Gentile', 'Nasomatto', 'Olfactive Studio', 'Papillon Artisan', 'Profumum Roma',
  'Robert Piguet', 'Santa Maria Novella', 'The Different Company', 'Chris Collins', 'D.S. & Durga',
  'Etat Libre d\'Orange', 'Floraiku', 'Fueguia 1833', 'Goldfield Banks', 'House of Oud',
  'IDEO Parfumeurs', 'James Heeley', 'Kilian Paris', 'L\'Artisan Parfumeur', 'Musk Collection',
  'Neela Vermeire', 'OJAR', 'Pierre Guillaume', 'Quorum', 'Reminiscence',
  'Sospiro', 'The Harmonist', 'Unum', 'Vero Profumo', 'Widian',
  'XIVI', 'Yosh', 'Zizan', 'Acqua dell\'Elba', 'BDK Parfums',
  'Costume National', 'Dame Perfumery', 'Electimuss', 'Franck Boclet', 'Gritti',
  'Haute Fragrance Company', 'Il Profvmo', 'Jacques Fath', 'Korloff', 'Lubin',
];

/* ── Perfume Name Parts (for generation) ─ */
const prefixes = [
  'Midnight', 'Velvet', 'Royal', 'Golden', 'Crystal', 'Noir', 'Silver', 'Rose',
  'Amber', 'Ivory', 'Crimson', 'Diamond', 'Silk', 'Pearl', 'Obsidian', 'Eternal',
  'Sacred', 'Wild', 'Dark', 'Celestial', 'Mystic', 'Infinite', 'Pure', 'Grand',
  'Secret', 'Enchanted', 'Imperial', 'Forbidden', 'Electric', 'Vintage',
];

const suffixes = [
  'Oud', 'Rose', 'Bloom', 'Musk', 'Noir', 'Elixir', 'Essence', 'Dream',
  'Night', 'Garden', 'Saffron', 'Velvet', 'Ice', 'Fire', 'Storm', 'Ocean',
  'Aura', 'Spirit', 'Legend', 'Orchid', 'Cedar', 'Amber', 'Notes', 'Wings',
  'Shadow', 'Kiss', 'Whisper', 'Flame', 'Breeze', 'Silk',
];

const descriptions = [
  'A captivating blend of rare botanicals and precious woods',
  'Luxurious notes of jasmine and warm sandalwood',
  'Fresh citrus opening with a deep amber dry-down',
  'Velvety rose petals intertwined with smoky incense',
  'A bold statement of leather, oud, and dark spices',
  'Light and airy, like a walk through blooming gardens',
  'Rich oriental accords with a hint of vanilla',
  'Sparkling bergamot meets warm patchouli',
  'A mysterious blend of black orchid and tonka bean',
  'Crisp aquatic freshness with woody undertones',
  'Powdery iris meets creamy musk in perfect harmony',
  'Sun-kissed citrus and white tea with a floral heart',
  'Deep, intoxicating oud layered with saffron threads',
  'A delicate dance of peony and white lily',
  'Fiery ginger and pink pepper over a base of cedar',
  'Sensual tuberose and ylang-ylang in a silky blend',
  'Clean, modern musk with a touch of cashmere',
  'Exotic frankincense and myrrh from ancient lands',
  'Green fig and bamboo create a zen-like calm',
  'Decadent chocolate and coffee with a vanilla twist',
];

const badges = [
  'Best Seller', 'New Arrival', 'Top Rated', 'Fan Favourite',
  'Limited Edition', 'Exclusive', 'Editor\'s Pick', 'Award Winner',
  'Trending', 'Staff Pick',
];

const volumes = ['30 ml', '50 ml', '75 ml', '100 ml', '125 ml'];
const concentrations = ['EDP', 'EDT', 'Parfum', 'Cologne'];

const topNotes = ['Bergamot', 'Pink Pepper', 'Mandarin', 'Grapefruit', 'Saffron', 'Cardamom', 'Lemon Zest', 'Green Apple', 'Pear', 'Blackcurrant'];
const heartNotes = ['Rose', 'Jasmine', 'Iris', 'Tuberose', 'Ylang-Ylang', 'Peony', 'Violet', 'Magnolia', 'Lily of the Valley', 'Orchid'];
const baseNotes = ['Sandalwood', 'Vetiver', 'Tonka Bean', 'Vanilla', 'Musk', 'Amber', 'Cedar', 'Patchouli', 'Oud', 'Leather'];

/* ── Generate All Products ──────────── */
let productId = 1;

function generateProducts() {
  const allProducts = [];

  brands.forEach((brand, brandIndex) => {
    for (let i = 0; i < 10; i++) {
      const prefixIdx = (brandIndex * 10 + i) % prefixes.length;
      const suffixIdx = (brandIndex * 7 + i * 3) % suffixes.length;
      const name = `${prefixes[prefixIdx]} ${suffixes[suffixIdx]}`;
      const family = families[(brandIndex + i) % families.length];
      const category = genderCategories[(brandIndex + i) % genderCategories.length];
      const desc = descriptions[(brandIndex * 3 + i * 2) % descriptions.length];
      // Multiply by a coprime (17) to scramble images and prevent clustering
      const imageIdx = (productId * 17) % perfumeImages.length;
      const price = Math.round(50 + Math.random() * 450);
      const rating = (4 + Math.random()).toFixed(1);
      const hasBadge = (brandIndex * 10 + i) % 5 === 0;
      const seed = brandIndex * 10 + i;

      allProducts.push({
        _id: String(productId++),
        name,
        brand,
        price,
        family,
        category,
        gender: category,
        description: desc,
        image: perfumeImages[imageIdx],
        rating: parseFloat(rating),
        badge: hasBadge ? badges[(brandIndex + i) % badges.length] : null,
        volume: volumes[seed % volumes.length],
        concentration: concentrations[seed % concentrations.length],
        notes: {
          top: [topNotes[seed % topNotes.length], topNotes[(seed + 3) % topNotes.length]],
          heart: [heartNotes[(seed + 1) % heartNotes.length], heartNotes[(seed + 4) % heartNotes.length]],
          base: [baseNotes[(seed + 2) % baseNotes.length], baseNotes[(seed + 5) % baseNotes.length]],
        },
      });
    }
  });

  return allProducts;
}

export const allProducts = generateProducts();

/* ── Perfume Categories for Homepage ── */
export const perfumeCategories = [
  {
    name: 'Floral',
    desc: 'Romantic rose, jasmine & peony',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600',
    count: allProducts.filter(p => p.family === 'Floral').length,
  },
  {
    name: 'Woody',
    desc: 'Cedar, sandalwood & vetiver',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600',
    count: allProducts.filter(p => p.family === 'Woody').length,
  },
  {
    name: 'Fresh',
    desc: 'Citrus, aquatic & green notes',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600',
    count: allProducts.filter(p => p.family === 'Fresh').length,
  },
  {
    name: 'Oriental',
    desc: 'Amber, vanilla & warm spices',
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=600',
    count: allProducts.filter(p => p.family === 'Oriental').length,
  },
  {
    name: 'Luxury Collection',
    desc: 'The finest niche fragrances',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600',
    count: allProducts.filter(p => p.family === 'Luxury Collection').length,
  },
];

/* ── Gender Categories ────────────── */
export const genderCats = [
  { name: 'For Men', label: 'Masculine', desc: 'Bold woods, leather & spice', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=600', badge: 'Men' },
  { name: 'For Women', label: 'Feminine', desc: 'Floral, soft & enchanting', image: 'https://images.unsplash.com/photo-1590156206657-aec7b3d87a57?q=80&w=600', badge: 'Women' },
  { name: 'Unisex', label: 'Universal', desc: 'Balanced & versatile aromas', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600', badge: 'Unisex' },
];

/* ── Featured & Best Sellers (curated) ── */
export const featuredProducts = allProducts.filter(p => p.badge === 'Editor\'s Pick').slice(0, 8);
export const bestSellers = allProducts.filter(p => p.badge === 'Best Seller').slice(0, 8);
export const newArrivals = allProducts.filter(p => p.badge === 'New Arrival').slice(0, 8);
export const trending = allProducts.filter(p => p.badge === 'Trending').slice(0, 8);

// Guarantee perfect visual variety on the homepage by explicitly overriding layout arrays
bestSellers.forEach((p, idx) => p.image = perfumeImages[idx % perfumeImages.length]);
newArrivals.forEach((p, idx) => p.image = perfumeImages[(idx + 4) % perfumeImages.length]);
trending.forEach((p, idx) => p.image = perfumeImages[(idx + 8) % perfumeImages.length]);

/* ── Get unique brands list ─────────── */
export const uniqueBrands = [...new Set(allProducts.map(p => p.brand))];

/* ── Helper: get products by brand ──── */
export const getProductsByBrand = (brandName) =>
  allProducts.filter(p => p.brand === brandName);

/* ── Helper: get products by family ─── */
export const getProductsByFamily = (familyName) =>
  allProducts.filter(p => p.family === familyName);

/* ── Helper: search products ────────── */
export const searchProducts = (query) => {
  const q = query.toLowerCase();
  return allProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.family.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
};

export default allProducts;
