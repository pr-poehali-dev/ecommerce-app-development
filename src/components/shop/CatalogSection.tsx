import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Product } from './types';

interface CatalogSectionProps {
  filteredProducts: Product[];
  brands: string[];
  selectedBrands: string[];
  selectedSize: string;
  selectedColor: string;
  onToggleBrand: (brand: string) => void;
  onSelectSize: (size: string) => void;
  onSelectColor: (color: string) => void;
  onResetFilters: () => void;
  onAddToCart: (product: Product) => void;
}

export default function CatalogSection({
  filteredProducts,
  brands,
  selectedBrands,
  selectedSize,
  selectedColor,
  onToggleBrand,
  onSelectSize,
  onSelectColor,
  onResetFilters,
  onAddToCart
}: CatalogSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Каталог товаров</h2>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Icon name="Filter" size={20} />
              Фильтры
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Бренд</label>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedBrands.includes(brand)}
                        onChange={() => onToggleBrand(brand)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Размер</label>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <Badge 
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => onSelectSize(selectedSize === size ? '' : size)}
                    >
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Цвет</label>
                <div className="flex flex-wrap gap-2">
                  {['Черный', 'Белый', 'Серый', 'Синий', 'Красный', 'Бежевый'].map(color => (
                    <Badge 
                      key={color}
                      variant={selectedColor === color ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => onSelectColor(selectedColor === color ? '' : color)}
                    >
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>

              {(selectedBrands.length > 0 || selectedSize || selectedColor) && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onResetFilters}
                >
                  Сбросить фильтры
                </Button>
              )}
            </div>
          </Card>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02]">
                <CardContent className="p-0">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                    <h4 className="font-semibold text-lg mb-1">{product.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                    <p className="text-2xl font-bold text-primary mb-3">{product.price} ₽</p>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {product.sizes.slice(0, 3).map(size => (
                        <Badge key={size} variant="outline" className="text-xs">{size}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" onClick={() => onAddToCart(product)}>
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
