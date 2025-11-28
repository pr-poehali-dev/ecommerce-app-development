import { useState, useMemo } from 'react';
import Header from '@/components/shop/Header';
import HomeSection from '@/components/shop/HomeSection';
import CatalogSection from '@/components/shop/CatalogSection';
import InfoSections from '@/components/shop/InfoSections';
import { products, CartItem, Product } from '@/components/shop/types';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], []);
  
  const filteredProducts = useMemo(() => {
    if (selectedBrands.length === 0 && !selectedSize && !selectedColor) return products;
    
    return products.filter(product => {
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const sizeMatch = !selectedSize || product.sizes.includes(selectedSize);
      const colorMatch = !selectedColor || product.colors.includes(selectedColor);
      return brandMatch && sizeMatch && colorMatch;
    });
  }, [selectedBrands, selectedSize, selectedColor]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { 
        ...product, 
        quantity: 1, 
        selectedSize: product.sizes[0], 
        selectedColor: product.colors[0] 
      }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedSize('');
    setSelectedColor('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted/20">
      <Header 
        cart={cart}
        onNavigate={setActiveSection}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
      />

      <main>
        {activeSection === 'home' && (
          <HomeSection onNavigate={setActiveSection} />
        )}

        {activeSection === 'catalog' && (
          <CatalogSection 
            filteredProducts={filteredProducts}
            brands={brands}
            selectedBrands={selectedBrands}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            onToggleBrand={toggleBrand}
            onSelectSize={setSelectedSize}
            onSelectColor={setSelectedColor}
            onResetFilters={resetFilters}
            onAddToCart={addToCart}
          />
        )}

        <InfoSections 
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />
      </main>
    </div>
  );
}
