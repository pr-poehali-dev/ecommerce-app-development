import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { products } from './types';

interface HomeSectionProps {
  onNavigate: (section: string) => void;
}

export default function HomeSection({ onNavigate }: HomeSectionProps) {
  return (
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
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90" onClick={() => onNavigate('catalog')}>
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
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer animate-slide-up" onClick={() => onNavigate('catalog')}>
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
  );
}
