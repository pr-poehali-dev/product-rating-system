import { useState, useMemo } from 'react';
import ReviewCard from '@/components/ReviewCard';
import CommentsSheet from '@/components/CommentsSheet';
import { MOCK_REVIEWS, Review, getRecommendedReviews, INTEREST_SUGGESTIONS } from '@/data/mockData';
import Icon from '@/components/ui/icon';

const FILTERS = ['Для тебя', 'Популярные', 'Новые', 'Обсуждаемые'];

type Props = { interests: string[] };

export default function FeedPage({ interests }: Props) {
  const [allReviews, setAllReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [activeFilter, setActiveFilter] = useState('Для тебя');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [showInterestBanner, setShowInterestBanner] = useState(interests.length > 0);

  const displayedReviews = useMemo(() => {
    let base = [...allReviews];
    if (activeFilter === 'Для тебя') {
      base = getRecommendedReviews(interests, base);
    } else if (activeFilter === 'Популярные') {
      base = [...base].sort((a, b) => b.likes - a.likes);
    } else if (activeFilter === 'Новые') {
      base = [...base].reverse();
    } else if (activeFilter === 'Обсуждаемые') {
      base = [...base].sort((a, b) => b.comments.length - a.comments.length);
    }
    return base;
  }, [allReviews, activeFilter, interests]);

  const handleLike = (id: string) => {
    setAllReviews(prev => prev.map(r => {
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
    setAllReviews(prev => prev.map(r => {
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
    setAllReviews(prev => prev.map(r =>
      r.id === id ? { ...r, isFavorited: !r.isFavorited } : r
    ));
  };

  const handleOpenComments = (review: Review) => {
    setSelectedReview(allReviews.find(r => r.id === review.id) || review);
    setCommentsOpen(true);
  };

  const handleAddComment = (reviewId: string, text: string) => {
    const newComment = {
      id: `c${Date.now()}`,
      author: { name: 'Вы', avatar: 'ВЫ' },
      text,
      createdAt: 'только что',
    };
    setAllReviews(prev => prev.map(r =>
      r.id === reviewId ? { ...r, comments: [...r.comments, newComment] } : r
    ));
    setSelectedReview(prev =>
      prev && prev.id === reviewId ? { ...prev, comments: [...prev.comments, newComment] } : prev
    );
  };

  const activeInterestLabels = INTEREST_SUGGESTIONS
    .filter(i => interests.includes(i.id))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-caveat text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Зацени
            </span>
            <span className="text-xl">⭐</span>
          </div>
          <button className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center pulse-glow">
            <Icon name="Bell" size={16} className="text-white" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
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

      <div className="px-4 py-4 pb-24">
        {showInterestBanner && interests.length > 0 && (
          <div className="mb-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-3 flex items-center gap-3 animate-fade-in">
            <div className="text-2xl flex-shrink-0">✨</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-purple-700">Персональная лента</p>
              <p className="text-xs text-purple-500 mt-0.5 truncate">
                {activeInterestLabels.map(i => `${i.emoji} ${i.label}`).join(' · ')}
                {interests.length > 3 ? ` и ещё ${interests.length - 3}` : ''}
              </p>
            </div>
            <button onClick={() => setShowInterestBanner(false)} className="flex-shrink-0">
              <Icon name="X" size={14} className="text-purple-400" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedReviews.map((review, idx) => (
            <div
              key={review.id}
              className="animate-slide-up"
              style={{ animationDelay: `${Math.min(idx * 0.06, 0.4)}s` }}
            >
              <ReviewCard
                review={review}
                onLike={handleLike}
                onDislike={handleDislike}
                onFavorite={handleFavorite}
                onOpenComments={handleOpenComments}
              />
            </div>
          ))}
        </div>

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
