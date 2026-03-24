import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { MOCK_REVIEWS, CATEGORIES } from '@/data/mockData';
import ReviewCard from '@/components/ReviewCard';
import CommentsSheet from '@/components/CommentsSheet';
import { Review } from '@/data/mockData';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const filtered = query.trim().length > 1
    ? reviews.filter(r =>
        r.product.toLowerCase().includes(query.toLowerCase()) ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.author.name.toLowerCase().includes(query.toLowerCase()) ||
        r.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleLike = (id: string) => {
    setReviews(prev => prev.map(r => {
      if (r.id !== id) return r;
      const wasLiked = r.isLiked;
      return { ...r, isLiked: !wasLiked, likes: wasLiked ? r.likes - 1 : r.likes + 1 };
    }));
  };
  const handleDislike = (id: string) => {
    setReviews(prev => prev.map(r => {
      if (r.id !== id) return r;
      const wasDisliked = r.isDisliked;
      return { ...r, isDisliked: !wasDisliked, dislikes: wasDisliked ? r.dislikes - 1 : r.dislikes + 1 };
    }));
  };
  const handleFavorite = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isFavorited: !r.isFavorited } : r));
  };
  const handleOpenComments = (review: Review) => {
    setSelectedReview(reviews.find(r => r.id === review.id) || review);
    setCommentsOpen(true);
  };
  const handleAddComment = (reviewId: string, text: string) => {
    const newComment = { id: `c${Date.now()}`, author: { name: 'Вы', avatar: 'ВЫ' }, text, createdAt: 'только что' };
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, comments: [...r.comments, newComment] } : r));
    setSelectedReview(prev => prev && prev.id === reviewId ? { ...prev, comments: [...prev.comments, newComment] } : prev);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-4">
        <h1 className="font-caveat text-2xl font-bold mb-3">Поиск</h1>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Товар, услуга, место..."
            className="w-full bg-muted rounded-2xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-300 transition-all font-golos"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <Icon name="X" size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="px-4 py-4 pb-24">
        {query.trim().length > 1 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {filtered.length > 0 ? `Найдено: ${filtered.length}` : 'Ничего не найдено'}
            </p>
            <div className="space-y-4">
              {filtered.map(review => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onLike={handleLike}
                  onDislike={handleDislike}
                  onFavorite={handleFavorite}
                  onOpenComments={handleOpenComments}
                />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <p className="font-semibold text-gray-700">Отзывов не найдено</p>
                <p className="text-sm text-muted-foreground mt-1">Попробуй другой запрос</p>
              </div>
            )}
          </>
        ) : (
          <>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">Популярные категории</p>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => setQuery(cat.name)}
                  className="bg-white rounded-2xl p-4 text-left shadow-sm border border-border/50 card-hover animate-slide-up"
                  style={{ animationDelay: `${idx * 0.04}s` }}
                >
                  <div className="text-2xl mb-2">{cat.emoji}</div>
                  <div className="font-semibold text-sm">{cat.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{cat.count} отзывов</div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <CommentsSheet
        review={selectedReview}
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        onAddComment={handleAddComment}
      />
    </div>
  );
}
