import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  brand: string;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

const products: Product[] = [
  { id: 1, name: 'Стильная куртка', price: 5990, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/622d942a-bd93-48db-b912-fcf75d42770f.jpg', category: 'Верхняя одежда', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Черный', 'Серый', 'Бежевый'], brand: 'Urban Style' },
  { id: 2, name: 'Классическая рубашка', price: 2990, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/16fd812f-f3b1-45f5-ba46-f64e51952b9a.jpg', category: 'Рубашки', sizes: ['S', 'M', 'L', 'XL'], colors: ['Белый', 'Голубой', 'Черный'], brand: 'Classic Wear' },
  { id: 3, name: 'Модные джинсы', price: 4490, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/bd83656e-93ac-44bd-9d6f-eee547ba941e.jpg', category: 'Джинсы', sizes: ['28', '30', '32', '34'], colors: ['Синий', 'Черный'], brand: 'Denim Pro' },
  { id: 4, name: 'Спортивный костюм', price: 6990, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/622d942a-bd93-48db-b912-fcf75d42770f.jpg', category: 'Спортивная одежда', sizes: ['S', 'M', 'L', 'XL'], colors: ['Черный', 'Серый', 'Синий'], brand: 'Sport Elite' },
  { id: 5, name: 'Элегантное платье', price: 7990, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/16fd812f-f3b1-45f5-ba46-f64e51952b9a.jpg', category: 'Платья', sizes: ['XS', 'S', 'M', 'L'], colors: ['Черный', 'Красный', 'Синий'], brand: 'Elegance' },
  { id: 6, name: 'Летняя футболка', price: 1490, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/bd83656e-93ac-44bd-9d6f-eee547ba941e.jpg', category: 'Футболки', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Белый', 'Черный', 'Серый', 'Синий'], brand: 'Urban Style' },
  { id: 7, name: 'Зимняя куртка', price: 9990, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/622d942a-bd93-48db-b912-fcf75d42770f.jpg', category: 'Верхняя одежда', sizes: ['S', 'M', 'L', 'XL'], colors: ['Черный', 'Синий', 'Зеленый'], brand: 'Winter Pro' },
  { id: 8, name: 'Кардиган', price: 3990, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/16fd812f-f3b1-45f5-ba46-f64e51952b9a.jpg', category: 'Кардиганы', sizes: ['S', 'M', 'L'], colors: ['Бежевый', 'Серый', 'Черный'], brand: 'Classic Wear' },
];

const reviews = [
  { id: 1, name: 'Анна К.', rating: 5, text: 'Отличное качество! Куртка села идеально, материал приятный.', date: '15.11.2024' },
  { id: 2, name: 'Дмитрий М.', rating: 5, text: 'Быстрая доставка, всё как на фото. Рекомендую!', date: '12.11.2024' },
  { id: 3, name: 'Елена П.', rating: 4, text: 'Хороший магазин, большой выбор. Буду заказывать еще.', date: '08.11.2024' },
];

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

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted/20">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Icon name="Shirt" size={28} className="text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                StyleShop
              </h1>
            </div>
            
            <nav className="hidden md:flex gap-6">
              <button onClick={() => setActiveSection('home')} className="text-sm font-medium hover:text-primary transition-colors">
                Главная
              </button>
              <button onClick={() => setActiveSection('catalog')} className="text-sm font-medium hover:text-primary transition-colors">
                Каталог
              </button>
              <button onClick={() => setActiveSection('payment')} className="text-sm font-medium hover:text-primary transition-colors">
                Оплата
              </button>
              <button onClick={() => setActiveSection('delivery')} className="text-sm font-medium hover:text-primary transition-colors">
                Доставка
              </button>
              <button onClick={() => setActiveSection('reviews')} className="text-sm font-medium hover:text-primary transition-colors">
                Отзывы
              </button>
              <button onClick={() => setActiveSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">
                Контакты
              </button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина покупок</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{item.name}</h4>
                                <p className="text-xs text-muted-foreground">{item.selectedSize} • {item.selectedColor}</p>
                                <p className="font-bold text-primary mt-1">{item.price} ₽</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.id, -1)}>
                                    <Icon name="Minus" size={12} />
                                  </Button>
                                  <span className="text-sm font-medium">{item.quantity}</span>
                                  <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.id, 1)}>
                                    <Icon name="Plus" size={12} />
                                  </Button>
                                  <Button size="icon" variant="ghost" className="h-6 w-6 ml-auto" onClick={() => removeFromCart(item.id)}>
                                    <Icon name="Trash2" size={12} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Итого:</span>
                          <span className="text-2xl font-bold text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        {activeSection === 'home' && (
          <>
            <section className="relative py-20 md:py-32 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
              <div className="container mx-auto px-4 relative">
                <div className="max-w-3xl mx-auto text-center animate-fade-in">
                  <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary">Новая коллекция 2024</Badge>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Стиль, который вдохновляет
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Современная одежда для тех, кто ценит качество и комфорт
                  </p>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90" onClick={() => setActiveSection('catalog')}>
                    Перейти в каталог
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            </section>

            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <h3 className="text-3xl font-bold text-center mb-12">Популярные категории</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['Верхняя одежда', 'Платья', 'Спортивная одежда'].map((category, idx) => (
                    <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer animate-slide-up" onClick={() => setActiveSection('catalog')}>
                      <CardContent className="p-0">
                        <img 
                          src={products.find(p => p.category === category)?.image || products[0].image} 
                          alt={category} 
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                          <h4 className="text-xl font-semibold">{category}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'catalog' && (
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
                              onChange={() => toggleBrand(brand)}
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
                            onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
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
                            onClick={() => setSelectedColor(selectedColor === color ? '' : color)}
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
                        onClick={() => {
                          setSelectedBrands([]);
                          setSelectedSize('');
                          setSelectedColor('');
                        }}
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
                        <Button className="w-full" onClick={() => addToCart(product)}>
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
        )}

        {activeSection === 'payment' && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-4xl font-bold mb-8 text-center">Способы оплаты</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <Icon name="CreditCard" size={32} className="text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Банковская карта</h3>
                  <p className="text-muted-foreground">Принимаем Visa, MasterCard, МИР. Безопасная оплата через защищенное соединение.</p>
                </Card>
                <Card className="p-6">
                  <Icon name="Wallet" size={32} className="text-secondary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Электронные кошельки</h3>
                  <p className="text-muted-foreground">ЮMoney, QIWI, WebMoney. Моментальное зачисление платежа.</p>
                </Card>
                <Card className="p-6">
                  <Icon name="Smartphone" size={32} className="text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Мобильные платежи</h3>
                  <p className="text-muted-foreground">Apple Pay, Google Pay, Samsung Pay. Быстро и удобно.</p>
                </Card>
                <Card className="p-6">
                  <Icon name="Banknote" size={32} className="text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">При получении</h3>
                  <p className="text-muted-foreground">Наличными или картой курьеру при доставке заказа.</p>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'delivery' && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-4xl font-bold mb-8 text-center">Условия доставки</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <Icon name="Truck" className="text-primary" />
                      Курьерская доставка
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">Доставка по Москве и МО в течение 1-2 дней.</p>
                    <p className="font-semibold">Стоимость: 300 ₽ (бесплатно от 5000 ₽)</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <Icon name="Package" className="text-secondary" />
                      Пункты выдачи
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">Получение в пунктах CDEK, Boxberry по всей России.</p>
                    <p className="font-semibold">Стоимость: от 200 ₽</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" className="text-accent" />
                      Почта России
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">Доставка в любую точку России в течение 5-14 дней.</p>
                    <p className="font-semibold">Стоимость: от 350 ₽</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        )}

        {activeSection === 'reviews' && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-4xl font-bold mb-8 text-center">Отзывы покупателей</h2>
              <div className="space-y-4">
                {reviews.map(review => (
                  <Card key={review.id} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-4xl font-bold mb-8 text-center">Контакты</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Свяжитесь с нами</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" className="text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Телефон</p>
                        <p className="font-semibold">+7 (495) 123-45-67</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" className="text-secondary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold">info@styleshop.ru</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="MapPin" className="text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Адрес</p>
                        <p className="font-semibold">г. Москва, ул. Примерная, д. 1</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" className="text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Режим работы</p>
                        <p className="font-semibold">Пн-Вс: 10:00 - 22:00</p>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Мы в соцсетях</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Instagram" className="mr-3" />
                      Instagram
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Facebook" className="mr-3" />
                      Facebook
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Send" className="mr-3" />
                      Telegram
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-foreground text-background py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="Shirt" size={24} />
                StyleShop
              </h4>
              <p className="text-sm opacity-80">Современная одежда для стильных людей</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Покупателям</h5>
              <ul className="space-y-2 text-sm opacity-80">
                <li><button onClick={() => setActiveSection('payment')}>Оплата</button></li>
                <li><button onClick={() => setActiveSection('delivery')}>Доставка</button></li>
                <li><button onClick={() => setActiveSection('reviews')}>Отзывы</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Компания</h5>
              <ul className="space-y-2 text-sm opacity-80">
                <li><button onClick={() => setActiveSection('contacts')}>Контакты</button></li>
                <li>О нас</li>
                <li>Вакансии</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Помощь</h5>
              <ul className="space-y-2 text-sm opacity-80">
                <li>FAQ</li>
                <li>Возврат</li>
                <li>Гарантия</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-80">
            © 2024 StyleShop. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
