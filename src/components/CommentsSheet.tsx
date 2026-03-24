import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { Review, AVATAR_COLORS } from '@/data/mockData';
import { Avatar } from './ReviewCard';

type Props = {
  review: Review | null;
  open: boolean;
  onClose: () => void;
  onAddComment: (reviewId: string, text: string) => void;
};

export default function CommentsSheet({ review, open, onClose, onAddComment }: Props) {
  const [text, setText] = useState('');

  if (!review) return null;

  const handleSend = () => {
    if (!text.trim()) return;
    onAddComment(review.id, text.trim());
    setText('');
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-5 pt-5 pb-3 border-b border-border/50">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
            <SheetTitle className="text-left text-base font-bold">
              Обсуждение: {review.product}
            </SheetTitle>
            <p className="text-xs text-muted-foreground text-left">«{review.title}»</p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {review.comments.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">💬</div>
                <p className="text-muted-foreground text-sm">Пока нет комментариев</p>
                <p className="text-muted-foreground text-xs mt-1">Будь первым!</p>
              </div>
            )}
            {review.comments.map((comment, idx) => (
              <div key={comment.id} className="flex gap-3 animate-slide-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                <Avatar initials={comment.author.avatar} colorIdx={idx + 2} size="sm" />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-3 py-2">
                    <div className="font-semibold text-xs text-gray-700 mb-0.5">{comment.author.name}</div>
                    <p className="text-sm text-gray-800">{comment.text}</p>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2 mt-1 block">{comment.createdAt}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-4 border-t border-border/50 bg-white">
            <div className="flex gap-2 items-end">
              <div className="flex-1 bg-gray-50 rounded-2xl px-4 py-2.5 flex items-center gap-2">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Задай вопрос или оставь комментарий..."
                  className="flex-1 bg-transparent text-sm outline-none resize-none max-h-24 font-golos"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!text.trim()}
                className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
              >
                <Icon name="Send" size={16} className="text-white ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
