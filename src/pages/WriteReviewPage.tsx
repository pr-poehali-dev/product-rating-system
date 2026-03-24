import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { CATEGORIES } from '@/data/mockData';

type Props = { onBack: () => void };

export default function WriteReviewPage({ onBack }: Props) {
  const [product, setProduct] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = product && category && rating > 0 && title && text.length >= 30;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
        <div className="text-7xl mb-4 animate-bounce-in">🎉</div>
        <h2 className="font-caveat text-3xl font-bold mb-2">Отзыв опубликован!</h2>
        <p className="text-muted-foreground text-sm mb-2">Ты получаешь <span className="font-bold text-purple-600">+50 очков</span></p>
        <p className="text-muted-foreground text-xs mb-8">Твой отзыв поможет другим людям сделать правильный выбор</p>
        <button
          onClick={onBack}
          className="gradient-primary text-white font-semibold px-8 py-3 rounded-2xl shadow-lg hover:shadow-purple-300 transition-all"
        >
          Вернуться в ленту
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-4 flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <Icon name="X" size={16} />
        </button>
        <div>
          <h1 className="font-caveat text-xl font-bold">Написать отзыв</h1>
        </div>
      </div>

      <div className="px-4 py-4 pb-24 space-y-5">
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
            Что оцениваешь? *
          </label>
          <input
            value={product}
            onChange={e => setProduct(e.target.value)}
            placeholder="Название товара, услуги или места..."
            className="w-full bg-white border border-border rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-300 transition-all font-golos"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
            Категория *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.slice(0, 9).map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 ${
                  category === cat.id
                    ? 'border-purple-400 bg-purple-50 text-purple-700'
                    : 'border-border bg-white text-gray-600 hover:border-purple-200'
                }`}
              >
                <span>{cat.emoji}</span>
                <span className="truncate">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
            Оценка *
          </label>
          <div className="flex gap-2 items-center">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-125 active:scale-110"
              >
                <span
                  style={{ fontSize: 32 }}
                  className={star <= (hoverRating || rating) ? 'star-filled' : 'star-empty'}
                >
                  ★
                </span>
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm font-semibold text-gray-600">
                {['', 'Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично!'][rating]}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
            Заголовок *
          </label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Коротко о главном..."
            className="w-full bg-white border border-border rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-300 transition-all font-golos"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
            Твой отзыв * <span className="normal-case font-normal text-muted-foreground">(минимум 30 символов)</span>
          </label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Расскажи подробнее — что понравилось, что нет, кому рекомендуешь..."
            rows={5}
            className="w-full bg-white border border-border rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-300 transition-all resize-none font-golos"
          />
          <div className="text-right text-xs text-muted-foreground mt-1">{text.length} / 30 мин.</div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
            canSubmit
              ? 'gradient-primary text-white shadow-lg hover:shadow-purple-300 hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {canSubmit ? '🚀 Опубликовать отзыв' : 'Заполни все поля'}
        </button>
      </div>
    </div>
  );
}
