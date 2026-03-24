import { TOP_REVIEWERS, MOCK_REVIEWS, AVATAR_COLORS } from '@/data/mockData';
import Icon from '@/components/ui/icon';

const MEDAL_COLORS = [
  'from-yellow-400 to-orange-400',
  'from-gray-300 to-gray-400',
  'from-orange-400 to-amber-600',
];

function TopProductCard({ product, rating, likes, emoji }: { product: string; rating: number; likes: number; emoji: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/50 flex items-center gap-3 card-hover">
      <div className="text-3xl w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">{emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm truncate">{product}</div>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ fontSize: 12 }} className={s <= rating ? 'star-filled' : 'star-empty'}>★</span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Icon name="ThumbsUp" size={11} /> {likes}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RatingsPage() {
  const topProducts = [
    { product: 'Sony PlayStation 5', rating: 5, likes: 567, emoji: '🎮' },
    { product: 'Алтай, Мультинские озёра', rating: 5, likes: 412, emoji: '🏔️' },
    { product: 'iPhone 15 Pro', rating: 5, likes: 234, emoji: '📱' },
    { product: 'Бургер "Чёрный Джек"', rating: 4, likes: 156, emoji: '🍔' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-4">
        <h1 className="font-caveat text-2xl font-bold">Рейтинги</h1>
        <p className="text-xs text-muted-foreground">Лучшие оценщики и товары</p>
      </div>

      <div className="px-4 py-4 pb-24 space-y-6">
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xl">🏆</div>
            <h2 className="font-bold text-base">Топ оценщиков</h2>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50">
            {TOP_REVIEWERS.map((reviewer, idx) => (
              <div
                key={reviewer.id}
                className={`flex items-center gap-3 px-4 py-3.5 animate-slide-up ${idx < TOP_REVIEWERS.length - 1 ? 'border-b border-border/30' : ''}`}
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 bg-gradient-to-br ${idx < 3 ? MEDAL_COLORS[idx] : 'from-gray-200 to-gray-300'} ${idx >= 3 ? '!text-gray-600' : ''}`}>
                  {idx + 1}
                </div>

                <div className="avatar-ring flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_COLORS[reviewer.colorIdx]} flex items-center justify-center font-bold text-white text-sm`}>
                    {reviewer.avatar}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{reviewer.name}</div>
                  <div className="text-xs text-muted-foreground">{reviewer.reviews} отзывов</div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-sm gradient-primary bg-clip-text" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {reviewer.points.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">очков</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xl">⭐</div>
            <h2 className="font-bold text-base">Топ товаров недели</h2>
          </div>
          <div className="space-y-3">
            {topProducts.map((p, idx) => (
              <div key={idx} style={{ animationDelay: `${idx * 0.06}s` }} className="animate-slide-up">
                <TopProductCard {...p} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xl">📊</div>
            <h2 className="font-bold text-base">Статистика платформы</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: '5 127', label: 'отзывов', emoji: '📝' },
              { value: '1 839', label: 'оценщиков', emoji: '👥' },
              { value: '48 920', label: 'лайков', emoji: '👍' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-border/50 animate-bounce-in" style={{ animationDelay: `${idx * 0.08}s` }}>
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="font-bold text-lg leading-tight">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-5 text-white">
            <div className="text-2xl mb-2">🚀</div>
            <h3 className="font-bold text-base mb-1">Как заработать очки?</h3>
            <div className="space-y-2 mt-3">
              {[
                { action: 'Написать отзыв', points: '+50 очков' },
                { action: 'Получить лайк', points: '+5 очков' },
                { action: 'Ответить на вопрос', points: '+10 очков' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-white/90">{item.action}</span>
                  <span className="font-bold bg-white/20 px-2 py-0.5 rounded-full">{item.points}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
