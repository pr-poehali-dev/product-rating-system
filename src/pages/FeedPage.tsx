import { useState } from 'react';
import ReviewCard from '@/components/ReviewCard';
import CommentsSheet from '@/components/CommentsSheet';
import { MOCK_REVIEWS, Review } from '@/data/mockData';
import Icon from '@/components/ui/icon';

const FILTERS = ['Все', 'Популярные', 'Новые', 'Обсуждаемые'];

export default function FeedPage() {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [activeFilter, setActiveFilter] = useState('Все');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const handleLike = (id: string) => {
    setReviews(prev => prev.map(r => {
      if (r.id !== id) return r;
      const wasLiked = r.isLiked;
      return {
        ...r,
        isLiked: !wasLiked,
        isDisliked: wasLiked ? r.isDisliked : false,
        likes: wasLiked ? r.likes - 1 : r.likes + 1,
        dislikes: !wasLiked && r.isDisliked ? r.dislikes - 1 : r.dislikes,
      };
    }));
  };

  const handleDislike = (id: string) => {
    setReviews(prev => prev.map(r => {
      if (r.id !== id) return r;
      const wasDisliked = r.isDisliked;
      return {
        ...r,
        isDisliked: !wasDisliked,
        isLiked: wasDisliked ? r.isLiked : false,
        dislikes: wasDisliked ? r.dislikes - 1 : r.dislikes + 1,
        likes: !wasDisliked && r.isLiked ? r.likes - 1 : r.likes,
      };
    }));
  };

  const handleFavorite = (id: string) => {
    setReviews(prev => prev.map(r =>
      r.id === id ? { ...r, isFavorited: !r.isFavorited } : r
    ));
  };

  const handleOpenComments = (review: Review) => {
    setSelectedReview(reviews.find(r => r.id === review.id) || review);
    setCommentsOpen(true);
  };

  const handleAddComment = (reviewId: string, text: string) => {
    const newComment = {
      id: `c${Date.now()}`,
      author: { name: 'Вы', avatar: 'ВЫ' },
      text,
      createdAt: 'только что',
    };
    setReviews(prev => prev.map(r =>
      r.id === reviewId ? { ...r, comments: [...r.comments, newComment] } : r
    ));
    setSelectedReview(prev => prev && prev.id === reviewId
      ? { ...prev, comments: [...prev.comments, newComment] }
      : prev
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="font-caveat text-2xl font-bold text-foreground leading-tight">
              Лента отзывов
            </h1>
            <p className="text-xs text-muted-foreground">Честные оценки от живых людей</p>
          </div>
          <button className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center pulse-glow">
            <Icon name="Bell" size={16} className="text-white" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                activeFilter === f
                  ? 'tab-active'
                  : 'bg-muted text-muted-foreground hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4 pb-24">
        {reviews.map((review, idx) => (
          <div key={review.id} style={{ animationDelay: `${idx * 0.07}s` }}>
            <ReviewCard
              review={review}
              onLike={handleLike}
              onDislike={handleDislike}
              onFavorite={handleFavorite}
              onOpenComments={handleOpenComments}
            />
          </div>
        ))}

        <div className="text-center py-8">
          <div className="text-3xl mb-2">🚀</div>
          <p className="text-sm text-muted-foreground">Это все отзывы на сегодня</p>
          <p className="text-xs text-muted-foreground mt-1">Возвращайся завтра за новыми!</p>
        </div>
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
