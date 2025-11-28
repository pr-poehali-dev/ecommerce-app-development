export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  brand: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export const products: Product[] = [
  { id: 1, name: 'Стильная куртка', price: 5990, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/622d942a-bd93-48db-b912-fcf75d42770f.jpg', category: 'Верхняя одежда', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Черный', 'Серый', 'Бежевый'], brand: 'Urban Style' },
  { id: 2, name: 'Классическая рубашка', price: 2990, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/16fd812f-f3b1-45f5-ba46-f64e51952b9a.jpg', category: 'Рубашки', sizes: ['S', 'M', 'L', 'XL'], colors: ['Белый', 'Голубой', 'Черный'], brand: 'Classic Wear' },
  { id: 3, name: 'Модные джинсы', price: 4490, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/bd83656e-93ac-44bd-9d6f-eee547ba941e.jpg', category: 'Джинсы', sizes: ['28', '30', '32', '34'], colors: ['Синий', 'Черный'], brand: 'Denim Pro' },
  { id: 4, name: 'Спортивный костюм', price: 6990, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/622d942a-bd93-48db-b912-fcf75d42770f.jpg', category: 'Спортивная одежда', sizes: ['S', 'M', 'L', 'XL'], colors: ['Черный', 'Серый', 'Синий'], brand: 'Sport Elite' },
  { id: 5, name: 'Элегантное платье', price: 7990, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/16fd812f-f3b1-45f5-ba46-f64e51952b9a.jpg', category: 'Платья', sizes: ['XS', 'S', 'M', 'L'], colors: ['Черный', 'Красный', 'Синий'], brand: 'Elegance' },
  { id: 6, name: 'Летняя футболка', price: 1490, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/bd83656e-93ac-44bd-9d6f-eee547ba941e.jpg', category: 'Футболки', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Белый', 'Черный', 'Серый', 'Синий'], brand: 'Urban Style' },
  { id: 7, name: 'Зимняя куртка', price: 9990, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/622d942a-bd93-48db-b912-fcf75d42770f.jpg', category: 'Верхняя одежда', sizes: ['S', 'M', 'L', 'XL'], colors: ['Черный', 'Синий', 'Зеленый'], brand: 'Winter Pro' },
  { id: 8, name: 'Кардиган', price: 3990, image: 'https://cdn.poehali.dev/projects/80c20703-1de2-412f-bd25-279ef07d2ba0/files/16fd812f-f3b1-45f5-ba46-f64e51952b9a.jpg', category: 'Кардиганы', sizes: ['S', 'M', 'L'], colors: ['Бежевый', 'Серый', 'Черный'], brand: 'Classic Wear' },
];

export const reviews = [
  { id: 1, name: 'Анна К.', rating: 5, text: 'Отличное качество! Куртка села идеально, материал приятный.', date: '15.11.2024' },
  { id: 2, name: 'Дмитрий М.', rating: 5, text: 'Быстрая доставка, всё как на фото. Рекомендую!', date: '12.11.2024' },
  { id: 3, name: 'Елена П.', rating: 4, text: 'Хороший магазин, большой выбор. Буду заказывать еще.', date: '08.11.2024' },
];
