import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Review, AVATAR_COLORS } from '@/data/mockData';

type Props = {
  review: Review;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onFavorite: (id: string) => void;
  onOpenComments: (review: Review) => void;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? 'star-filled' : 'star-empty'} style={{ fontSize: 14 }}>
          ★
        </span>
      ))}
    </div>
  );
}

function Avatar({ initials, colorIdx, size = 'md' }: { initials: string; colorIdx: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base' };
  return (
    <div className="avatar-ring" style={{ display: 'inline-block' }}>
      <div className={`${sizes[size]} rounded-full bg-gradient-to-br ${AVATAR_COLORS[colorIdx % AVATAR_COLORS.length]} flex items-center justify-center font-bold text-white`}>
        {initials}
      </div>
    </div>
  );
}

export { Avatar };

export default function ReviewCard({ review, onLike, onDislike, onFavorite, onOpenComments }: Props) {
  const [showAllText, setShowAllText] = useState(false);
  const authorIdx = review.author.id.replace('u', '');
  const colorIdx = parseInt(authorIdx) - 1;
  const isLong = review.text.length > 180;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden card-hover animate-slide-up">
      {review.image && (
        <div className="relative h-52 overflow-hidden">
          <img src={review.image} alt={review.product} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full">
              {review.categoryEmoji} {review.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <button
              onClick={() => onFavorite(review.id)}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center btn-like"
            >
              <Icon
                name={review.isFavorited ? 'Bookmark' : 'Bookmark'}
                size={16}
                className={review.isFavorited ? 'text-purple-500 fill-purple-500' : 'text-gray-500'}
              />
            </button>
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <Avatar initials={review.author.avatar} colorIdx={colorIdx} />
            <div>
              <div className="font-semibold text-sm leading-tight">{review.author.name}</div>
              <div className="text-xs text-muted-foreground">{review.author.badge}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <StarRating rating={review.rating} />
            <span className="text-xs text-muted-foreground">{review.createdAt}</span>
          </div>
        </div>

        <div className="mb-1">
          <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
            {review.categoryEmoji} {review.product}
          </span>
        </div>

        <h3 className="font-bold text-base mt-2 mb-1 leading-snug">{review.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {isLong && !showAllText ? review.text.slice(0, 180) + '...' : review.text}
          {isLong && (
            <button
              onClick={() => setShowAllText(!showAllText)}
              className="ml-1 text-purple-500 font-medium hover:text-purple-700 transition-colors"
            >
              {showAllText ? 'скрыть' : 'читать далее'}
            </button>
          )}
        </p>

        {!review.image && (
          <div className="mt-3 flex items-center gap-2">
            <span className="bg-purple-50 text-purple-600 text-xs font-medium px-2 py-0.5 rounded-full">
              {review.categoryEmoji} {review.category}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onLike(review.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold btn-like transition-all ${
                review.isLiked
                  ? 'gradient-like text-white shadow-md'
                  : 'bg-green-50 text-green-600 hover:bg-green-100'
              }`}
            >
              <Icon name="ThumbsUp" size={14} className={review.isLiked ? 'fill-white' : ''} />
              {review.likes}
            </button>
            <button
              onClick={() => onDislike(review.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold btn-like transition-all ${
                review.isDisliked
                  ? 'gradient-dislike text-white shadow-md'
                  : 'bg-red-50 text-red-500 hover:bg-red-100'
              }`}
            >
              <Icon name="ThumbsDown" size={14} className={review.isDisliked ? 'fill-white' : ''} />
              {review.dislikes}
            </button>
          </div>

          <button
            onClick={() => onOpenComments(review)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-50 text-gray-500 hover:bg-purple-50 hover:text-purple-600 transition-all"
          >
            <Icon name="MessageCircle" size={14} />
            {review.comments.length > 0 ? review.comments.length : 'Обсудить'}
          </button>
        </div>
      </div>
    </div>
  );
}
