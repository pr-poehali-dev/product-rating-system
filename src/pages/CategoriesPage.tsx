import { useState } from 'react';
import { CATEGORIES, MOCK_REVIEWS } from '@/data/mockData';
import ReviewCard from '@/components/ReviewCard';
import CommentsSheet from '@/components/CommentsSheet';
import { Review } from '@/data/mockData';
import Icon from '@/components/ui/icon';

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const activeCat = CATEGORIES.find(c => c.id === activeCategory);
  const filteredReviews = activeCategory
    ? reviews.filter(r => r.category === activeCat?.name)
    : [];

  const handleLike = (id: string) => setReviews(prev => prev.map(r => r.id === id ? { ...r, isLiked: !r.isLiked, likes: r.isLiked ? r.likes - 1 : r.likes + 1 } : r));
  const handleDislike = (id: string) => setReviews(prev => prev.map(r => r.id === id ? { ...r, isDisliked: !r.isDisliked, dislikes: r.isDisliked ? r.dislikes - 1 : r.dislikes + 1 } : r));
  const handleFavorite = (id: string) => setReviews(prev => prev.map(r => r.id === id ? { ...r, isFavorited: !r.isFavorited } : r));
  const handleOpenComments = (review: Review) => { setSelectedReview(review); setCommentsOpen(true); };
  const handleAddComment = (reviewId: string, text: string) => {
    const newComment = { id: `c${Date.now()}`, author: { name: 'Вы', avatar: 'ВЫ' }, text, createdAt: 'только что' };
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, comments: [...r.comments, newComment] } : r));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-4">
        <div className="flex items-center gap-3">
          {activeCategory && (
            <button
              onClick={() => setActiveCategory(null)}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
            >
              <Icon name="ArrowLeft" size={16} />
            </button>
          )}
          <div>
            <h1 className="font-caveat text-2xl font-bold">
              {activeCategory ? `${activeCat?.emoji} ${activeCat?.name}` : 'Категории'}
            </h1>
            {activeCategory && (
              <p className="text-xs text-muted-foreground">{activeCat?.count} отзывов</p>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-4 pb-24">
        {!activeCategory ? (
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="bg-white rounded-2xl p-5 text-left shadow-sm border border-border/50 card-hover animate-slide-up relative overflow-hidden"
                style={{ animationDelay: `${idx * 0.04}s` }}
              >
                <div className="absolute top-2 right-3 text-3xl opacity-20">{cat.emoji}</div>
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <div className="font-bold text-sm">{cat.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{cat.count} отзывов</div>
                <div className="mt-3 flex items-center gap-1 text-purple-500">
                  <span className="text-xs font-semibold">Смотреть</span>
                  <Icon name="ChevronRight" size={12} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.length > 0 ? filteredReviews.map(review => (
              <ReviewCard
                key={review.id}
                review={review}
                onLike={handleLike}
                onDislike={handleDislike}
                onFavorite={handleFavorite}
                onOpenComments={handleOpenComments}
              />
            )) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">{activeCat?.emoji}</div>
                <p className="font-semibold text-gray-700">Пока нет отзывов</p>
                <p className="text-sm text-muted-foreground mt-1">Будь первым в этой категории!</p>
              </div>
            )}
          </div>
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
