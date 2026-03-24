import { useState } from 'react';
import { MOCK_REVIEWS, AVATAR_COLORS } from '@/data/mockData';
import ReviewCard from '@/components/ReviewCard';
import CommentsSheet from '@/components/CommentsSheet';
import { Review } from '@/data/mockData';
import Icon from '@/components/ui/icon';

const MY_USER = {
  id: 'u1',
  name: 'Алексей Морозов',
  avatar: 'АМ',
  bio: 'Оцениваю честно и по делу 🎯',
  level: 'Эксперт оценщик',
  colorIdx: 1,
  points: 3910,
  reviews: 128,
  likes: 1842,
  followers: 342,
  badge: '⭐ Топ-оценщик',
};

const TABS = ['Отзывы', 'Избранное'];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Отзывы');
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const myReviews = reviews.filter(r => r.author.id === MY_USER.id);
  const favorited = reviews.filter(r => r.isFavorited);

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
      <div className="gradient-primary px-4 pt-6 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 70% 50%, white 0%, transparent 60%)' }} />
        <div className="flex justify-between items-start relative">
          <div className="flex items-center gap-3">
            <div className="avatar-ring">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${AVATAR_COLORS[MY_USER.colorIdx]} flex items-center justify-center font-bold text-white text-xl`}>
                {MY_USER.avatar}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-white text-lg leading-tight">{MY_USER.name}</h2>
              <div className="text-white/80 text-xs">{MY_USER.level}</div>
              <div className="badge-reviewer text-xs px-2 py-0.5 rounded-full mt-1 inline-block">
                {MY_USER.badge}
              </div>
            </div>
          </div>
          <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <Icon name="Settings" size={16} className="text-white" />
          </button>
        </div>

        <p className="text-white/80 text-sm mt-4 relative">{MY_USER.bio}</p>

        <div className="grid grid-cols-4 gap-2 mt-5 relative">
          {[
            { value: MY_USER.points.toLocaleString(), label: 'очков' },
            { value: MY_USER.reviews, label: 'отзывов' },
            { value: MY_USER.likes.toLocaleString(), label: 'лайков' },
            { value: MY_USER.followers, label: 'читателей' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/15 backdrop-blur-sm rounded-xl p-2.5 text-center">
              <div className="font-bold text-white text-base leading-tight">{stat.value}</div>
              <div className="text-white/70 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="bg-muted rounded-2xl p-1 flex gap-1">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab ? 'tab-active' : 'text-muted-foreground'
              }`}
            >
              {tab === 'Отзывы' ? `📝 Мои отзывы (${myReviews.length})` : `🔖 Избранное (${favorited.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 pb-24 space-y-4">
        {activeTab === 'Отзывы' ? (
          myReviews.length > 0 ? myReviews.map(review => (
            <ReviewCard key={review.id} review={review} onLike={handleLike} onDislike={handleDislike} onFavorite={handleFavorite} onOpenComments={handleOpenComments} />
          )) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">✍️</div>
              <p className="font-semibold text-gray-700">Нет отзывов</p>
              <p className="text-sm text-muted-foreground mt-1">Напиши свой первый отзыв!</p>
            </div>
          )
        ) : (
          favorited.length > 0 ? favorited.map(review => (
            <ReviewCard key={review.id} review={review} onLike={handleLike} onDislike={handleDislike} onFavorite={handleFavorite} onOpenComments={handleOpenComments} />
          )) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔖</div>
              <p className="font-semibold text-gray-700">Нет избранного</p>
              <p className="text-sm text-muted-foreground mt-1">Сохраняй отзывы, нажимая на закладку</p>
            </div>
          )
        )}
      </div>

      <CommentsSheet review={selectedReview} open={commentsOpen} onClose={() => setCommentsOpen(false)} onAddComment={handleAddComment} />
    </div>
  );
}
