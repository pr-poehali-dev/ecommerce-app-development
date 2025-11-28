import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { reviews } from './types';

interface InfoSectionsProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function InfoSections({ activeSection, onNavigate }: InfoSectionsProps) {
  return (
    <>
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
                <li><button onClick={() => onNavigate('payment')}>Оплата</button></li>
                <li><button onClick={() => onNavigate('delivery')}>Доставка</button></li>
                <li><button onClick={() => onNavigate('reviews')}>Отзывы</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Компания</h5>
              <ul className="space-y-2 text-sm opacity-80">
                <li><button onClick={() => onNavigate('contacts')}>Контакты</button></li>
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
    </>
  );
}
