import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { CartItem } from './types';

interface HeaderProps {
  cart: CartItem[];
  onNavigate: (section: string) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveFromCart: (id: number) => void;
}

export default function Header({ cart, onNavigate, onUpdateQuantity, onRemoveFromCart }: HeaderProps) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
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
            <button onClick={() => onNavigate('home')} className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </button>
            <button onClick={() => onNavigate('catalog')} className="text-sm font-medium hover:text-primary transition-colors">
              Каталог
            </button>
            <button onClick={() => onNavigate('payment')} className="text-sm font-medium hover:text-primary transition-colors">
              Оплата
            </button>
            <button onClick={() => onNavigate('delivery')} className="text-sm font-medium hover:text-primary transition-colors">
              Доставка
            </button>
            <button onClick={() => onNavigate('reviews')} className="text-sm font-medium hover:text-primary transition-colors">
              Отзывы
            </button>
            <button onClick={() => onNavigate('contacts')} className="text-sm font-medium hover:text-primary transition-colors">
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
                                <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => onUpdateQuantity(item.id, -1)}>
                                  <Icon name="Minus" size={12} />
                                </Button>
                                <span className="text-sm font-medium">{item.quantity}</span>
                                <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => onUpdateQuantity(item.id, 1)}>
                                  <Icon name="Plus" size={12} />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-6 w-6 ml-auto" onClick={() => onRemoveFromCart(item.id)}>
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
  );
}
