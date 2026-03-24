export type Category = {
  id: string;
  name: string;
  emoji: string;
  count: number;
  tags: string[];
};

export type Review = {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    level: string;
    reviewCount: number;
    badge: string;
  };
  product: string;
  category: string;
  categoryId: string;
  categoryEmoji: string;
  rating: number;
  title: string;
  text: string;
  image?: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
  createdAt: string;
  isLiked?: boolean;
  isDisliked?: boolean;
  isFavorited?: boolean;
};

export type Comment = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  text: string;
  createdAt: string;
};

export const CATEGORIES: Category[] = [
  { id: 'electronics', name: 'Электроника', emoji: '📱', count: 1248, tags: ['гаджеты', 'технологии', 'смартфоны'] },
  { id: 'food', name: 'Еда и рестораны', emoji: '🍔', count: 892, tags: ['еда', 'кулинария', 'рестораны'] },
  { id: 'travel', name: 'Путешествия', emoji: '✈️', count: 634, tags: ['путешествия', 'туризм', 'отдых'] },
  { id: 'beauty', name: 'Красота и уход', emoji: '💄', count: 521, tags: ['красота', 'косметика', 'уход'] },
  { id: 'sports', name: 'Спорт', emoji: '🏋️', count: 418, tags: ['спорт', 'фитнес', 'здоровье'] },
  { id: 'books', name: 'Книги', emoji: '📚', count: 389, tags: ['книги', 'литература', 'образование'] },
  { id: 'home', name: 'Дом и быт', emoji: '🏠', count: 312, tags: ['дом', 'интерьер', 'ремонт'] },
  { id: 'cars', name: 'Авто', emoji: '🚗', count: 287, tags: ['авто', 'машины', 'транспорт'] },
  { id: 'services', name: 'Услуги', emoji: '🛠️', count: 256, tags: ['услуги', 'сервис', 'курсы'] },
  { id: 'games', name: 'Игры', emoji: '🎮', count: 203, tags: ['игры', 'консоли', 'компьютер'] },
  { id: 'pets', name: 'Животные', emoji: '🐶', count: 178, tags: ['животные', 'питомцы'] },
  { id: 'music', name: 'Музыка', emoji: '🎵', count: 145, tags: ['музыка', 'концерты'] },
];

export const INTEREST_SUGGESTIONS = [
  { id: 'travel', label: 'Путешествия', emoji: '✈️' },
  { id: 'food', label: 'Еда и рестораны', emoji: '🍔' },
  { id: 'electronics', label: 'Гаджеты', emoji: '📱' },
  { id: 'beauty', label: 'Красота и мода', emoji: '💄' },
  { id: 'sports', label: 'Спорт и фитнес', emoji: '🏋️' },
  { id: 'books', label: 'Книги', emoji: '📚' },
  { id: 'games', label: 'Игры', emoji: '🎮' },
  { id: 'home', label: 'Дом и интерьер', emoji: '🏠' },
  { id: 'cars', label: 'Авто и мото', emoji: '🚗' },
  { id: 'services', label: 'Услуги и курсы', emoji: '🛠️' },
  { id: 'pets', label: 'Животные', emoji: '🐶' },
  { id: 'music', label: 'Музыка', emoji: '🎵' },
];

export const AVATAR_COLORS = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-orange-500 to-yellow-500',
  'from-green-500 to-teal-500',
  'from-red-500 to-pink-500',
  'from-indigo-500 to-purple-500',
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    author: { id: 'u1', name: 'Алексей Морозов', avatar: 'АМ', level: 'Эксперт', reviewCount: 128, badge: '⭐ Топ-оценщик' },
    product: 'iPhone 15 Pro',
    category: 'Электроника',
    categoryId: 'electronics',
    categoryEmoji: '📱',
    rating: 5,
    title: 'Лучший смартфон, который я держал в руках',
    text: 'Три месяца использования — и я не перестаю восхищаться. Камера делает фото лучше, чем мой старый фотоаппарат. Титановый корпус невероятно приятен на ощупь. Единственный минус — цена кусается, но оно того стоит.',
    image: 'https://cdn.poehali.dev/projects/cd8b5053-2b0f-44f9-a17e-f21688a36227/files/47dfc64a-308e-4593-a72f-7943b6ea8d9c.jpg',
    likes: 234,
    dislikes: 12,
    comments: [
      { id: 'c1', author: { name: 'Мария К.', avatar: 'МК' }, text: 'А как с автономностью? У меня 14 Pro разряжался очень быстро', createdAt: '2 часа назад' },
      { id: 'c2', author: { name: 'Алексей Морозов', avatar: 'АМ' }, text: 'На 15 Pro заметно лучше! Стабильно день с активным использованием', createdAt: '1 час назад' },
    ],
    createdAt: '3 часа назад',
  },
  {
    id: '2',
    author: { id: 'u2', name: 'Наташа Волкова', avatar: 'НВ', level: 'Гурман', reviewCount: 67, badge: '🍴 Знаток вкуса' },
    product: 'Бургер "Чёрный Джек" в Dark Kitchen',
    category: 'Еда и рестораны',
    categoryId: 'food',
    categoryEmoji: '🍔',
    rating: 4,
    title: 'Почти идеально — но есть нюансы',
    text: 'Бургер огромный, сочный, котлета прожарена идеально. Соус фирменный — объедение. Но картошка приехала чуть тёплая. Место явно стоит посетить повторно, буду заказывать снова!',
    image: 'https://cdn.poehali.dev/projects/cd8b5053-2b0f-44f9-a17e-f21688a36227/files/08acd3c4-110a-4899-88f8-a644899626bb.jpg',
    likes: 156,
    dislikes: 8,
    comments: [
      { id: 'c3', author: { name: 'Игорь П.', avatar: 'ИП' }, text: 'Согласен про картошку, но бургер топ! Ем туда каждую неделю', createdAt: '5 часов назад' },
    ],
    createdAt: '6 часов назад',
  },
  {
    id: '3',
    author: { id: 'u3', name: 'Денис Смирнов', avatar: 'ДС', level: 'Путешественник', reviewCount: 89, badge: '🌍 Исследователь' },
    product: 'Алтай, трекинг к Мультинским озёрам',
    category: 'Путешествия',
    categoryId: 'travel',
    categoryEmoji: '✈️',
    rating: 5,
    title: 'Место, которое меняет взгляд на мир',
    text: 'Три дня пешком через горные перевалы. Никакой связи, только природа и ты. Вода в озёрах изумрудно-бирюзовая, воздух кристально чистый. Дорога к первому озеру — 22 км, но каждый шаг стоит финального вида.',
    image: 'https://cdn.poehali.dev/projects/cd8b5053-2b0f-44f9-a17e-f21688a36227/files/4c3b27c9-8520-4fda-8aae-8d4eea8ed311.jpg',
    likes: 412,
    dislikes: 5,
    comments: [
      { id: 'c4', author: { name: 'Светлана А.', avatar: 'СА' }, text: 'Были там в прошлом году! Абсолютно согласна — это магия', createdAt: '1 день назад' },
      { id: 'c5', author: { name: 'Роман Б.', avatar: 'РБ' }, text: 'Какое снаряжение брали? Планируем на лето', createdAt: '20 часов назад' },
    ],
    createdAt: '1 день назад',
  },
  {
    id: '4',
    author: { id: 'u4', name: 'Ольга Петрова', avatar: 'ОП', level: 'Новичок', reviewCount: 12, badge: '🌱 Начинающий' },
    product: 'Курс английского в SkyEng',
    category: 'Услуги',
    categoryId: 'services',
    categoryEmoji: '🛠️',
    rating: 3,
    title: 'Нормально, но есть лучше варианты',
    text: 'Занималась полгода. Система удобная, приложение красивое. Но преподаватель постоянно менялся — каждый раз заново объяснять свой уровень. Прогресс есть, но медленнее, чем ожидала.',
    likes: 89,
    dislikes: 34,
    comments: [],
    createdAt: '2 дня назад',
  },
  {
    id: '5',
    author: { id: 'u5', name: 'Михаил Зайцев', avatar: 'МЗ', level: 'Геймер', reviewCount: 201, badge: '🎮 Про-геймер' },
    product: 'Sony PlayStation 5',
    category: 'Игры',
    categoryId: 'games',
    categoryEmoji: '🎮',
    rating: 5,
    title: 'Следующее поколение — это реально',
    text: 'Spider-Man 2 в 4K 60fps с трассировкой лучей — это что-то нереальное. DualSense с адаптивными триггерами — убийственная фишка. Когда стреляешь из лука в Horizon, чувствуешь натяжение тетивы. Консоль 10/10.',
    likes: 567,
    dislikes: 23,
    comments: [
      { id: 'c6', author: { name: 'Андрей К.', avatar: 'АК' }, text: 'А шум вентилятора не мешает? Слышал жалобы на первые модели', createdAt: '3 часа назад' },
    ],
    createdAt: '3 дня назад',
  },
  {
    id: '6',
    author: { id: 'u3', name: 'Денис Смирнов', avatar: 'ДС', level: 'Путешественник', reviewCount: 89, badge: '🌍 Исследователь' },
    product: 'Отель Rixos в Турции, Белек',
    category: 'Путешествия',
    categoryId: 'travel',
    categoryEmoji: '✈️',
    rating: 4,
    title: 'Хороший пляж, но сервис мог быть лучше',
    text: 'Отличный пляж с белым песком, огромная территория, много бассейнов. Еда разнообразная — не надоедает за неделю. Анимация бодрая. Из минусов: долгое заселение, иногда грубят на ресепшене.',
    likes: 98,
    dislikes: 14,
    comments: [],
    createdAt: '4 дня назад',
  },
  {
    id: '7',
    author: { id: 'u2', name: 'Наташа Волкова', avatar: 'НВ', level: 'Гурман', reviewCount: 67, badge: '🍴 Знаток вкуса' },
    product: 'Ресторан White Rabbit, Москва',
    category: 'Еда и рестораны',
    categoryId: 'food',
    categoryEmoji: '🍔',
    rating: 5,
    title: 'Лучший вид и лучшая еда в Москве',
    text: 'Обед с видом на всю Москву с 16 этажа — незабываемо. Сибирский краб, строганина из нельмы, глухарь — всё на высочайшем уровне. Дорого, но ради особого случая — идеально.',
    likes: 203,
    dislikes: 7,
    comments: [],
    createdAt: '5 дней назад',
  },
  {
    id: '8',
    author: { id: 'u1', name: 'Алексей Морозов', avatar: 'АМ', level: 'Эксперт', reviewCount: 128, badge: '⭐ Топ-оценщик' },
    product: 'Sony WH-1000XM5',
    category: 'Электроника',
    categoryId: 'electronics',
    categoryEmoji: '📱',
    rating: 5,
    title: 'Лучшее шумоподавление на рынке',
    text: 'Работаю в опенспейсе — без этих наушников уже не могу. Шумодав убирает 95% офисного шума. Звук тёплый, насыщенный. 30 часов на одном заряде — хватает на рабочую неделю с запасом.',
    likes: 178,
    dislikes: 4,
    comments: [],
    createdAt: '6 дней назад',
  },
  {
    id: '9',
    author: { id: 'u4', name: 'Ольга Петрова', avatar: 'ОП', level: 'Новичок', reviewCount: 12, badge: '🌱 Начинающий' },
    product: 'Yoga-студия «Прана», СПб',
    category: 'Спорт',
    categoryId: 'sports',
    categoryEmoji: '🏋️',
    rating: 5,
    title: 'Лучшая студия йоги в городе',
    text: 'Занимаюсь уже 8 месяцев. Инструкторы внимательные, всегда поправят позу. Много форматов: хатха, виньяса, инь-йога. Чистые коврики, приятная атмосфера. Цена выше среднего, но качество соответствует.',
    likes: 134,
    dislikes: 3,
    comments: [],
    createdAt: '1 неделю назад',
  },
  {
    id: '10',
    author: { id: 'u5', name: 'Михаил Зайцев', avatar: 'МЗ', level: 'Геймер', reviewCount: 201, badge: '🎮 Про-геймер' },
    product: 'Книга «Атомные привычки»',
    category: 'Книги',
    categoryId: 'books',
    categoryEmoji: '📚',
    rating: 5,
    title: 'Книга, которая реально меняет жизнь',
    text: 'Прочитал за 3 дня, внедряю уже полгода. Система 1% улучшений работает. Перестал смотреть ютуб по утрам, добавил бег, бросил курить. Конкретные инструменты, без воды. Must-read для всех.',
    likes: 445,
    dislikes: 19,
    comments: [],
    createdAt: '1 неделю назад',
  },
];

export const TOP_REVIEWERS = [
  { id: 'u5', name: 'Михаил Зайцев', avatar: 'МЗ', points: 4820, reviews: 201, badge: '🏆 #1', colorIdx: 0 },
  { id: 'u1', name: 'Алексей Морозов', avatar: 'АМ', points: 3910, reviews: 128, badge: '🥈 #2', colorIdx: 1 },
  { id: 'u3', name: 'Денис Смирнов', avatar: 'ДС', points: 2840, reviews: 89, badge: '🥉 #3', colorIdx: 2 },
  { id: 'u2', name: 'Наташа Волкова', avatar: 'НВ', points: 1760, reviews: 67, badge: '⭐ #4', colorIdx: 3 },
  { id: 'u4', name: 'Ольга Петрова', avatar: 'ОП', points: 540, reviews: 12, badge: '🌱 #5', colorIdx: 4 },
];

export function getRecommendedReviews(interests: string[], allReviews: Review[]): Review[] {
  if (!interests || interests.length === 0) return allReviews;
  const interestSet = new Set(interests);
  const scored = allReviews.map(review => {
    const isMatch = interestSet.has(review.categoryId);
    const score = isMatch ? 10000 + review.likes : review.likes;
    return { review, score };
  });
  return scored.sort((a, b) => b.score - a.score).map(s => s.review);
}
